package middleware

import (
	"log/slog"

	"github.com/gin-gonic/gin"
)

func IPLogging() gin.HandlerFunc {
	return func(c *gin.Context) {
		slog.Info("request",
			"ip", c.ClientIP(),
			"method", c.Request.Method,
			"path", c.Request.URL.Path,
		)
		c.Next()
	}
}
