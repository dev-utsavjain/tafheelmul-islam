package handler

import (
	"net/http"

	"imagine_backend/internal/apperror"
	"imagine_backend/internal/dto"
	"imagine_backend/internal/services"

	"github.com/gin-gonic/gin"
)

func CreateContact(c *gin.Context) {
	var req dto.ContactRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		apperror.SendError(c, apperror.BadRequest("Missing required fields"))
		return
	}
	if err := services.CreateContact(req); err != nil {
		apperror.SendError(c, apperror.Internal(err.Error()))
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true})
}
