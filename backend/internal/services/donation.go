package services

import (
	"errors"
	"log/slog"

	"imagine_backend/internal/dto"
	"imagine_backend/internal/model"
	"imagine_backend/internal/repositary"
)

// CreateDonation persists the donation, then sends the donor + owner emails in
// the same order the original mailer used (donor first, owner second) and
// returns on the first failure.
func CreateDonation(req dto.DonationRequest) error {
	d := &model.Donation{Name: req.Name, Phone: req.Phone, Email: req.Email}
	if err := repositary.CreateDonation(d); err != nil {
		slog.Error("save donation", "err", err)
		return errors.New("could not save donation")
	}
	if err := sendDonorEmail(req.Name, req.Email); err != nil {
		return err
	}
	return sendOwnerEmail(req.Name, req.Phone, req.Email)
}
