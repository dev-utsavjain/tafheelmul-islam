package main

import (
	"fmt"
	"log"

	"imagine_backend/config"
	"imagine_backend/internal/db"
	"imagine_backend/internal/model"
)

func main() {
	config.LoadConfig()
	db.ConnectToDB()

	schema := config.AppConfig.DBSchema
	if schema == "" {
		log.Fatalf("DB_SCHEMA is required but empty — cannot migrate without a target schema")
	}
	if err := db.DB.Exec(fmt.Sprintf(`CREATE SCHEMA IF NOT EXISTS "%s"`, schema)).Error; err != nil {
		log.Fatalf("create schema %q: %v", schema, err)
	}
	if err := db.DB.Exec(fmt.Sprintf(`SET search_path TO "%s"`, schema)).Error; err != nil {
		log.Fatalf("set search_path %q: %v", schema, err)
	}
	log.Printf("Running migrations in schema %q...", schema)
	if err := db.DB.AutoMigrate(
		&model.Donation{},
		&model.ContactMessage{},
	); err != nil {
		log.Fatalf("migration failed: %v", err)
	}
	log.Println("Migrations completed successfully.")
}
