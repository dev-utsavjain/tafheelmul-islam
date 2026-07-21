package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// CORS allows all origins — the imagine.bo preview and this backend are on
// different hosts, so every browser call is cross-origin. Auth is a Bearer
// token (not cookies), so "*" is valid; do NOT add Allow-Credentials with "*".
func CORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization")
		if c.Request.Method == http.MethodOptions {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Next()
	}
}
