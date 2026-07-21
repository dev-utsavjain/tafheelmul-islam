package middleware

import (
	"net/http"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
)

// RateLimiter is a naive fixed-window per-IP limiter.
// ponytail: single-instance only; swap for golang.org/x/time/rate or Redis if
// we scale past one replica.
func RateLimiter() gin.HandlerFunc {
	const limit = 30
	const window = time.Minute

	var mu sync.Mutex
	counts := make(map[string]int)
	windowStart := time.Now()

	return func(c *gin.Context) {
		mu.Lock()
		if time.Since(windowStart) > window {
			counts = make(map[string]int)
			windowStart = time.Now()
		}
		counts[c.ClientIP()]++
		over := counts[c.ClientIP()] > limit
		mu.Unlock()

		if over {
			c.AbortWithStatusJSON(http.StatusTooManyRequests, gin.H{"error": "too many requests"})
			return
		}
		c.Next()
	}
}
