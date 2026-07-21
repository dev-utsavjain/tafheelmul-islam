package services

import (
	"errors"
	"log/slog"

	"imagine_backend/internal/dto"
	"imagine_backend/internal/model"
	"imagine_backend/internal/repositary"
)

// CreateContact persists the message, then sends the owner notification email —
// same as the original mailer (which returned an error if the send failed).
func CreateContact(req dto.ContactRequest) error {
	m := &model.ContactMessage{Name: req.Name, Email: req.Email, Subject: req.Subject, Message: req.Message}
	if err := repositary.CreateContactMessage(m); err != nil {
		slog.Error("save contact", "err", err)
		return errors.New("could not save contact message")
	}
	return sendContactNotificationEmail(req.Name, req.Email, req.Subject, req.Message)
}
