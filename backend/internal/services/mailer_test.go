package services

import (
	"os"
	"strings"
	"testing"
)

// Templates must render and inject data exactly as the original mailer did.
func TestTemplatesInjectData(t *testing.T) {
	donor, err := renderTemplate(donorTemplate, map[string]string{"Name": "Aisha"})
	if err != nil || !strings.Contains(donor, "Dear Aisha,") {
		t.Fatalf("donor template: err=%v injected=%v", err, strings.Contains(donor, "Dear Aisha,"))
	}
	owner, err := renderTemplate(ownerTemplate, map[string]string{"Name": "Aisha", "Phone": "999", "Email": "a@b.c"})
	if err != nil {
		t.Fatal(err)
	}
	for _, want := range []string{"Aisha", "999", "a@b.c", "New Donation Submission"} {
		if !strings.Contains(owner, want) {
			t.Fatalf("owner template missing %q", want)
		}
	}
	contact, err := renderTemplate(contactTemplate, map[string]string{"Name": "Bob", "Email": "b@c.d", "Subject": "Hi", "Message": "Hello there"})
	if err != nil {
		t.Fatal(err)
	}
	for _, want := range []string{"Bob", "b@c.d", "Hi", "Hello there", "New Message Received"} {
		if !strings.Contains(contact, want) {
			t.Fatalf("contact template missing %q", want)
		}
	}
}

// Missing Gmail creds must surface the same error the old mailer returned
// (not silently succeed).
func TestMissingCredsReturnsOldError(t *testing.T) {
	os.Unsetenv("GMAIL_USER")
	os.Unsetenv("GMAIL_APP_PASSWORD")
	if err := sendDonorEmail("A", "a@b.c"); err == nil || err.Error() != "Mail server not configured" {
		t.Fatalf("donor: want 'Mail server not configured', got %v", err)
	}
	if err := sendOwnerEmail("A", "1", "a@b.c"); err == nil || err.Error() != "Mail server not configured" {
		t.Fatalf("owner: want 'Mail server not configured', got %v", err)
	}
	if err := sendContactNotificationEmail("A", "a@b.c", "S", "M"); err == nil || err.Error() != "Mail server not configured" {
		t.Fatalf("contact: want 'Mail server not configured', got %v", err)
	}
}
