package middleware

import (
	"strings"

	"imagine_backend/config"
	"imagine_backend/internal/apperror"
	"imagine_backend/internal/utils"

	"github.com/gin-gonic/gin"
)

// AuthMiddleware validates a Bearer JWT signed with the platform JWT_SECRET.
// Scaffolding for now: admin auth stays on Supabase in the frontend, so no
// route is wired to this yet. Ready for when admin endpoints move here.
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		header := c.GetHeader("Authorization")
		if !strings.HasPrefix(header, "Bearer ") {
			apperror.SendError(c, apperror.Unauthorized("missing or invalid authorization header"))
			c.Abort()
			return
		}
		claims, err := utils.ValidateJWT(strings.TrimPrefix(header, "Bearer "), config.AppConfig.JWTSecret)
		if err != nil {
			apperror.SendError(c, apperror.Unauthorized("invalid token"))
			c.Abort()
			return
		}
		c.Set("sub", claims.Subject)
		c.Next()
	}
}
