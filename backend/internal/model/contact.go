package model

import "time"

type ContactMessage struct {
	ID        uint   `gorm:"primaryKey"`
	Name      string `gorm:"not null"`
	Email     string `gorm:"not null"`
	Subject   string `gorm:"not null"`
	Message   string `gorm:"type:text;not null"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

func (ContactMessage) TableName() string { return "contact_messages" }
