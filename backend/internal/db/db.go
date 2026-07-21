package db

import (
	"fmt"
	"log"

	"imagine_backend/config"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// DB is the process-wide GORM handle.
var DB *gorm.DB

// ConnectToDB opens the pool and scopes every connection to DB_SCHEMA via
// search_path. Never hardcodes a schema or "public".
func ConnectToDB() {
	cfg := config.AppConfig
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=UTC search_path=%s",
		cfg.DBHost, cfg.DBUser, cfg.DBPassword, cfg.DBName, cfg.DBPort, cfg.DBSchema,
	)
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}
	DB = database
}
