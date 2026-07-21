package server

import (
	"imagine_backend/internal/handler"
	"imagine_backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

// RegisterRoutes wires the /api group. GET /api/health is the route the
// railway.toml healthcheck points at.
func RegisterRoutes(r *gin.Engine) {
	api := r.Group("/api")
	api.GET("/health", handler.HealthCheck)
	api.POST("/donations", middleware.RateLimiter(), handler.CreateDonation)
	api.POST("/contact", middleware.RateLimiter(), handler.CreateContact)
}
