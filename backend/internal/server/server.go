package server

import (
	"io/fs"
	"log"
	"net/http"
	"strings"

	"imagine_backend/config"
	"imagine_backend/internal"
	"imagine_backend/internal/db"
	"imagine_backend/internal/logger"
	"imagine_backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

func StartServer() {
	config.LoadConfig()
	logger.InitLogger(config.AppConfig.Env)
	db.ConnectToDB()

	if config.AppConfig.Env == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.New()
	r.Use(gin.Recovery(), middleware.IPLogging(), middleware.CORS(), middleware.ErrorHandler())

	RegisterRoutes(r)

	// Serve the embedded SPA with an index.html fallback for client-side routes.
	dist, err := fs.Sub(internal.DistFS, "dist")
	if err != nil {
		log.Fatalf("embed dist: %v", err)
	}
	fileServer := http.FileServer(http.FS(dist))
	r.NoRoute(func(c *gin.Context) {
		if strings.HasPrefix(c.Request.URL.Path, "/api/") {
			c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
			return
		}
		name := strings.TrimPrefix(c.Request.URL.Path, "/")
		if name == "" {
			name = "index.html"
		}
		if _, statErr := fs.Stat(dist, name); statErr != nil {
			c.Request.URL.Path = "/" // SPA fallback
		}
		fileServer.ServeHTTP(c.Writer, c.Request)
	})

	if err := r.Run(":" + config.AppConfig.Port); err != nil {
		log.Fatalf("server: %v", err)
	}
}
