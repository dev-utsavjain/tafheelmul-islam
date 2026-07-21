package services

import (
	"bytes"
	"errors"
	"fmt"
	"html/template"
	"log/slog"
	"math/rand"
	"net/smtp"
	"os"
	"time"
)

// Behavior matches the original net/http mailer exactly: a missing Gmail config
// or a failed send returns an error to the caller, which surfaces it to the
// client as a 500 (the frontend shows the message). Callers persist BEFORE
// calling these, so a row is stored regardless of email outcome — the same as
// the old flow, where the frontend's Supabase insert ran before the mail call.
func gmailCreds() (user, pass string, ok bool) {
	user = os.Getenv("GMAIL_USER")
	pass = os.Getenv("GMAIL_APP_PASSWORD")
	if user == "" || pass == "" {
		return "", "", false
	}
	return user, pass, true
}

func sendDonorEmail(name, toEmail string) error {
	user, pass, ok := gmailCreds()
	if !ok {
		slog.Error("Missing Gmail environment variables")
		return errors.New("Mail server not configured")
	}
	body, err := renderTemplate(donorTemplate, map[string]string{"Name": name})
	if err != nil {
		slog.Error("Donor email render failed", "err", err)
		return errors.New("Failed to send donor email")
	}
	if err := sendHTMLMail(user, pass, toEmail, "Thank you for supporting Tafheem-ul-Islam Trust", body); err != nil {
		slog.Error("Donor email failed", "err", err)
		return errors.New("Failed to send donor email")
	}
	return nil
}

func sendOwnerEmail(name, phone, donorEmail string) error {
	user, pass, ok := gmailCreds()
	if !ok {
		slog.Error("Missing Gmail environment variables")
		return errors.New("Mail server not configured")
	}
	body, err := renderTemplate(ownerTemplate, map[string]string{"Name": name, "Phone": phone, "Email": donorEmail})
	if err != nil {
		slog.Error("Owner email render failed", "err", err)
		return errors.New("Failed to send owner email")
	}
	if err := sendHTMLMail(user, pass, user, "New donor submission received", body); err != nil {
		slog.Error("Owner email failed", "err", err)
		return errors.New("Failed to send owner email")
	}
	return nil
}

func sendContactNotificationEmail(name, email, subject, message string) error {
	user, pass, ok := gmailCreds()
	if !ok {
		slog.Error("Missing Gmail environment variables")
		return errors.New("Mail server not configured")
	}
	body, err := renderTemplate(contactTemplate, map[string]string{
		"Name": name, "Email": email, "Subject": subject, "Message": message,
	})
	if err != nil {
		slog.Error("Contact email render failed", "err", err)
		return errors.New("Failed to send contact notification email")
	}
	if err := sendHTMLMail(user, pass, user, fmt.Sprintf("New Website Contact Submission: %s", subject), body); err != nil {
		slog.Error("Contact notification email failed", "err", err)
		return errors.New("Failed to send contact notification email")
	}
	return nil
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
