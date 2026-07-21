package model

import "time"

type Donation struct {
	ID        uint   `gorm:"primaryKey"`
	Name      string `gorm:"not null"`
	Phone     string `gorm:"not null"`
	Email     string `gorm:"not null"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

func (Donation) TableName() string { return "donations" }
