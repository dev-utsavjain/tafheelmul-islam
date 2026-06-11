package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"math/rand"
	"net/http"
	"net/smtp"
	"os"
	"strings"
	"time"
)

// spaFileSystem wraps http.Dir and falls back to index.html for missing files,
// enabling client-side routing (React Router) on the same server.
type spaFileSystem struct {
	root http.FileSystem
}

func (s spaFileSystem) Open(name string) (http.File, error) {
	f, err := s.root.Open(name)
	if err != nil {
		return s.root.Open("/index.html")
	}
	return f, nil
}

type DonateRequest struct {
	Name  string `json:"name"`
	Phone string `json:"phone"`
	Email string `json:"email"`
}

type APIResponse struct {
	Success bool   `json:"success,omitempty"`
	Error   string `json:"error,omitempty"`
}

func loadEnv() {
	file, err := os.Open(".env")
	if err != nil {
		file, err = os.Open("../.env")
		if err != nil {
			return
		}
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		parts := strings.SplitN(line, "=", 2)
		if len(parts) != 2 {
			continue
		}
		key := strings.TrimSpace(parts[0])
		val := strings.TrimSpace(parts[1])
		if len(val) >= 2 && ((val[0] == '"' && val[len(val)-1] == '"') || (val[0] == '\'' && val[len(val)-1] == '\'')) {
			val = val[1 : len(val)-1]
		}
		if os.Getenv(key) == "" {
			os.Setenv(key, val)
		}
	}
}

type ContactRequest struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Subject string `json:"subject"`
	Message string `json:"message"`
}

func main() {
	loadEnv()
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	http.HandleFunc("/api/health", healthHandler)
	http.HandleFunc("/api/donate", withCORS(donateHandler))
	http.HandleFunc("/api/contact", withCORS(contactHandler))
	http.Handle("/", http.FileServer(spaFileSystem{http.Dir("./dist")}))

	log.Printf("Go mail server running on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

func contactHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		writeJSON(w, http.StatusMethodNotAllowed, APIResponse{Error: "Method not allowed"})
		return
	}

	var req ContactRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, APIResponse{Error: "Invalid request body"})
		return
	}

	if req.Name == "" || req.Email == "" || req.Subject == "" || req.Message == "" {
		writeJSON(w, http.StatusBadRequest, APIResponse{Error: "Missing required fields"})
		return
	}

	gmailUser := os.Getenv("GMAIL_USER")
	gmailPass := os.Getenv("GMAIL_APP_PASSWORD")

	if gmailUser == "" || gmailPass == "" {
		log.Println("Missing Gmail environment variables")
		writeJSON(w, http.StatusInternalServerError, APIResponse{Error: "Mail server not configured"})
		return
	}

	if err := sendContactNotificationEmail(gmailUser, gmailPass, req.Name, req.Email, req.Subject, req.Message); err != nil {
		log.Printf("Contact notification email failed: %v", err)
		writeJSON(w, http.StatusInternalServerError, APIResponse{Error: "Failed to send contact notification email"})
		return
	}

	writeJSON(w, http.StatusOK, APIResponse{Success: true})
}

func sendContactNotificationEmail(gmailUser, gmailPass, name, email, subject, message string) error {
	emailSubject := fmt.Sprintf("New Website Contact Submission: %s", subject)
	body, err := renderTemplate(contactTemplate, map[string]string{
		"Name":    name,
		"Email":   email,
		"Subject": subject,
		"Message": message,
	})
	if err != nil {
		return err
	}

	return sendHTMLMail(gmailUser, gmailPass, gmailUser, emailSubject, body)
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, APIResponse{Success: true})
}

func donateHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		writeJSON(w, http.StatusMethodNotAllowed, APIResponse{Error: "Method not allowed"})
		return
	}

	var req DonateRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, APIResponse{Error: "Invalid request body"})
		return
	}

	if req.Name == "" || req.Phone == "" || req.Email == "" {
		writeJSON(w, http.StatusBadRequest, APIResponse{Error: "Missing required fields"})
		return
	}

	gmailUser := os.Getenv("GMAIL_USER")
	gmailPass := os.Getenv("GMAIL_APP_PASSWORD")

	if gmailUser == "" || gmailPass == "" {
		log.Println("Missing Gmail environment variables")
		writeJSON(w, http.StatusInternalServerError, APIResponse{Error: "Mail server not configured"})
		return
	}

	if err := sendDonorEmail(gmailUser, gmailPass, req.Name, req.Email); err != nil {
		log.Printf("Donor email failed: %v", err)
		writeJSON(w, http.StatusInternalServerError, APIResponse{Error: "Failed to send donor email"})
		return
	}

	if err := sendOwnerEmail(gmailUser, gmailPass, req.Name, req.Phone, req.Email); err != nil {
		log.Printf("Owner email failed: %v", err)
		writeJSON(w, http.StatusInternalServerError, APIResponse{Error: "Failed to send owner email"})
		return
	}

	writeJSON(w, http.StatusOK, APIResponse{Success: true})
}

func sendDonorEmail(gmailUser, gmailPass, name, toEmail string) error {
	subject := "Thank you for supporting Tafheem-ul-Islam Trust"
	body, err := renderTemplate(donorTemplate, map[string]string{
		"Name": name,
	})
	if err != nil {
		return err
	}

	return sendHTMLMail(gmailUser, gmailPass, toEmail, subject, body)
}

func sendOwnerEmail(gmailUser, gmailPass, name, phone, donorEmail string) error {
	subject := "New donor submission received"
	body, err := renderTemplate(ownerTemplate, map[string]string{
		"Name":  name,
		"Phone": phone,
		"Email": donorEmail,
	})
	if err != nil {
		return err
	}

	return sendHTMLMail(gmailUser, gmailPass, gmailUser, subject, body)
}

func sendHTMLMail(username, password, to, subject, htmlBody string) error {
	auth := smtp.PlainAuth("", username, password, "smtp.gmail.com")

	messageID := fmt.Sprintf("<%d-%d@gmail.com>", time.Now().UnixNano(), rand.Int63())
	date := time.Now().Format(time.RFC1123Z)

	msg := "MIME-Version: 1.0\r\n" +
		"Content-Type: text/html; charset=UTF-8\r\n" +
		fmt.Sprintf("From: Tafheem-ul-Islam Trust <%s>\r\n", username) +
		fmt.Sprintf("To: %s\r\n", to) +
		fmt.Sprintf("Subject: %s\r\n", subject) +
		fmt.Sprintf("Date: %s\r\n", date) +
		fmt.Sprintf("Message-ID: %s\r\n", messageID) +
		"Precedence: bulk\r\n" +
		"X-Auto-Response-Suppress: All\r\n\r\n" +
		htmlBody

	return smtp.SendMail("smtp.gmail.com:587", auth, username, []string{to}, []byte(msg))
}

func renderTemplate(tpl string, data map[string]string) (string, error) {
	t, err := template.New("email").Parse(tpl)
	if err != nil {
		return "", err
	}

	var buf bytes.Buffer
	if err := t.Execute(&buf, data); err != nil {
		return "", err
	}

	return buf.String(), nil
}

func writeJSON(w http.ResponseWriter, status int, payload APIResponse) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}

func withCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		origin := os.Getenv("ALLOWED_ORIGIN")
		if origin == "" {
			origin = "*"
		}

		w.Header().Set("Access-Control-Allow-Origin", origin)
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		next(w, r)
	}
}

const donorTemplate = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Thank You</title>
</head>

<body style="margin:0;padding:0;background-color:#f4f7f4;font-family:Arial,Helvetica,sans-serif;color:#1f2937;">

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#f4f7f4">
  <tr>
    <td align="center" style="padding:20px 10px;">

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="620" style="max-width:620px;background:#ffffff;">

        <!-- HERO -->
        <tr>
          <td align="center" bgcolor="#0a301d" style="padding:36px 28px;">

            <!-- LOGO -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td bgcolor="#ffffff" style="padding:12px 20px;border-radius:12px;">
                  <img
                    src="https://res.cloudinary.com/dm3scoj2q/image/upload/v1780897979/T_logo_n_p9vebn.png"
                    alt="Tafheem-ul-Islam Trust"
                    width="180"
                    style="display:block;border:0;outline:none;text-decoration:none;height:auto;max-width:180px;">
                </td>
              </tr>
            </table>

            <div style="height:18px;line-height:18px;font-size:18px;">&nbsp;</div>

            <!-- BADGE -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td bgcolor="#bcff5f" style="padding:8px 16px;border-radius:20px;color:#0a301d;font-size:12px;font-weight:bold;letter-spacing:0.5px;">
                  TAFHEEM-UL-ISLAM TRUST
                </td>
              </tr>
            </table>

            <h1 style="margin:22px 0 10px;font-size:28px;line-height:34px;color:#ffffff;font-weight:bold;">
              Thank You for Your Support
            </h1>
            <p style="margin:0;color:#d1d5db;font-size:15px;line-height:24px;">
              Your generosity strengthens our work for vulnerable families, children, widows, and people in need.
            </p>

          </td>
        </tr>

        <!-- CONTENT -->
        <tr>
          <td style="padding:32px 28px;">

            <p style="margin:0 0 16px;font-size:15px;line-height:28px;color:#374151;">Dear {{.Name}},</p>
            <p style="margin:0 0 16px;font-size:15px;line-height:28px;color:#374151;">
              Thank you for sharing your donation details with Tafheem-ul-Islam Trust. We deeply value your support and the trust you have placed in our work.
            </p>

            <!-- NOTE BOX -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td bgcolor="#f0faf2" style="border:1px solid #ccebd4;border-radius:12px;padding:18px;color:#14532d;font-size:15px;line-height:24px;">
                  Your contribution will be used with care, responsibility, and sincerity to support people facing hardship and urgent need.
                </td>
              </tr>
            </table>

            <div style="height:22px;line-height:22px;font-size:22px;">&nbsp;</div>

            <p style="margin:0 0 16px;font-size:15px;line-height:28px;color:#374151;">
              Your kindness brings comfort, dignity, and hope to those who need it most.
            </p>
            <p style="margin:0;font-size:15px;line-height:28px;color:#0a301d;font-weight:bold;">
              With gratitude,<br>Tafheem-ul-Islam Trust
            </p>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td bgcolor="#fafafa" style="padding:24px 28px 34px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;text-align:center;font-size:13px;line-height:22px;color:#6b7280;">
              This is an automated message from Tafheem-ul-Islam Trust.
            </p>
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>
`

const ownerTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { margin:0; padding:24px; background:#f4f7f4; font-family:Arial,sans-serif; color:#1f2937; }
    .card { max-width:560px; margin:0 auto; background:white; border:1px solid #e5e7eb; border-radius:18px; overflow:hidden; }
    .head { background:#0a301d; color:white; padding:24px; }
    .head h1 { margin:0 0 6px; font-size:22px; color:#bcff5f; }
    .head p { margin:0; color:#d1d5db; font-size:14px; }
    .body { padding:24px; }
    .row { display:flex; justify-content:space-between; gap:12px; padding:14px 0; border-bottom:1px solid #f0f0f0; }
    .row:last-child { border-bottom:0; }
    .label { font-size:12px; color:#6b7280; font-weight:700; text-transform:uppercase; }
    .value { font-size:14px; color:#111827; font-weight:600; text-align:right; word-break:break-word; }
  </style>
</head>
<body>
  <div class="card">
    <div class="head">
      <h1>New Donation Submission</h1>
      <p>A donor has submitted details from the website.</p>
    </div>
    <div class="body">
      <div class="row"><div class="label">Name</div><div class="value">{{.Name}}</div></div>
      <div class="row"><div class="label">Phone</div><div class="value">{{.Phone}}</div></div>
      <div class="row"><div class="label">Email</div><div class="value">{{.Email}}</div></div>
    </div>
  </div>
</body>
</html>
`

const contactTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { margin:0; padding:24px; background:#f4f7f4; font-family:Arial,sans-serif; color:#1f2937; }
    .card { max-width:560px; margin:0 auto; background:white; border:1px solid #e5e7eb; border-radius:18px; overflow:hidden; }
    .head { background:#0a301d; color:white; padding:24px; }
    .head h1 { margin:0 0 6px; font-size:22px; color:#bcff5f; }
    .head p { margin:0; color:#d1d5db; font-size:14px; }
    .body { padding:24px; }
    .row { display:flex; justify-content:space-between; gap:12px; padding:14px 0; border-bottom:1px solid #f0f0f0; }
    .row:last-child { border-bottom:0; }
    .label { font-size:12px; color:#6b7280; font-weight:700; text-transform:uppercase; }
    .value { font-size:14px; color:#111827; font-weight:600; text-align:right; word-break:break-word; }
    .msg-block { background:#f9fafb; border:1px solid #e5e7eb; border-radius:12px; padding:16px; margin-top:16px; }
    .msg-label { font-size:11px; color:#9ca3af; font-weight:700; text-transform:uppercase; margin-bottom:8px; }
    .msg-content { font-size:14px; color:#374151; line-height:1.6; white-space:pre-wrap; }
  </style>
</head>
<body>
  <div class="card">
    <div class="head">
      <h1>New Message Received</h1>
      <p>Someone has submitted a contact form from the website.</p>
    </div>
    <div class="body">
      <div class="row"><div class="label">Name</div><div class="value">{{.Name}}</div></div>
      <div class="row"><div class="label">Email</div><div class="value">{{.Email}}</div></div>
      <div class="row"><div class="label">Subject</div><div class="value">{{.Subject}}</div></div>
      <div class="msg-block">
        <div class="msg-label">Message Content</div>
        <div class="msg-content">{{.Message}}</div>
      </div>
    </div>
  </div>
</body>
</html>
`