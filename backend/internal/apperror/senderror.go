package apperror

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// SendError writes an AppError as JSON {"error": "..."} (the shape the frontend
// already reads). Unknown errors collapse to a generic 500.
func SendError(c *gin.Context, err error) {
	if ae, ok := err.(*AppError); ok {
		c.JSON(ae.Code, gin.H{"error": ae.Message})
		return
	}
	c.JSON(http.StatusInternalServerError, gin.H{"error": "internal error"})
}
