package middleware

import (
	"imagine_backend/internal/apperror"

	"github.com/gin-gonic/gin"
)

// ErrorHandler flushes any error pushed onto the Gin context (via c.Error)
// as a JSON body after the handler chain runs.
func ErrorHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()
		if len(c.Errors) > 0 {
			apperror.SendError(c, c.Errors.Last().Err)
		}
	}
}
