package repositary

import (
	"imagine_backend/internal/db"
	"imagine_backend/internal/model"
)

func CreateContactMessage(m *model.ContactMessage) error {
	return db.DB.Create(m).Error
}
