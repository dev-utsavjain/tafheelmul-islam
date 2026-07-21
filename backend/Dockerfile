# Build stage — base image MUST be >= go.mod `go` directive (1.25).
FROM golang:1.25-alpine AS builder
WORKDIR /app
RUN apk add --no-cache git
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o bin/migration ./cmd/migration
RUN CGO_ENABLED=0 GOOS=linux go build -o bin/imagine_backend ./cmd/server

# Final stage
FROM alpine:latest
RUN apk add --no-cache ca-certificates tzdata
WORKDIR /app
COPY --from=builder /app/bin/migration ./bin/
COPY --from=builder /app/bin/imagine_backend ./bin/
COPY --from=builder /app/start.sh ./
RUN chmod +x ./start.sh
EXPOSE 8080
CMD ["./start.sh"]
