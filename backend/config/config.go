package config

import "os"

// Config holds the 9 platform-provided environment variables. Nothing here is
// hardcoded — every value comes from the deploy environment.
type Config struct {
	Port       string
	Env        string
	DBUser     string
	DBPassword string
	DBName     string
	DBHost     string
	DBPort     string
	DBSchema   string
	JWTSecret  string
}

// AppConfig is the process-wide config, populated by LoadConfig.
var AppConfig Config

func LoadConfig() {
	AppConfig = Config{
		Port:       getEnv("PORT", "8080"),
		Env:        getEnv("ENV", "production"),
		DBUser:     os.Getenv("DB_USER"),
		DBPassword: os.Getenv("DB_PASSWORD"),
		DBName:     os.Getenv("DB_NAME"),
		DBHost:     os.Getenv("DB_HOST"),
		DBPort:     getEnv("DB_PORT", "5432"),
		DBSchema:   os.Getenv("DB_SCHEMA"),
		JWTSecret:  os.Getenv("JWT_SECRET"),
	}
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
