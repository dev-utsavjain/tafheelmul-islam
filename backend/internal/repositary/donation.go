package repositary

import (
	"imagine_backend/internal/db"
	"imagine_backend/internal/model"
)

func CreateDonation(d *model.Donation) error {
	return db.DB.Create(d).Error
}
