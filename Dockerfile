# Stage 1: Build Go binary
FROM golang:1.22-alpine AS go-builder
WORKDIR /build
COPY src/backend-go/go.mod ./
RUN go mod download 2>/dev/null || true
COPY src/backend-go/main.go ./
RUN go build -o server main.go

# Stage 2: Build React frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /build
COPY package.json ./
RUN npm install
COPY . .
# VITE_* vars are baked into the JS bundle at build time.
# Supabase anon key is a public client key (safe to embed — it's in every user's browser JS).
# Empty VITE_GO_BACKEND_URL makes fetch calls relative (/api/...) — same-origin, no CORS needed.
ENV VITE_GO_BACKEND_URL=""
ENV VITE_SUPABASE_URL="https://kong-production-b1c2.up.railway.app"
ENV VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzc1MzI3NDAwLCJleHAiOjE5MzMwOTM4MDB9.s3m0G5Yye1XnaURDjnZ4pTTGf50sHC3wIb2mZhbOous"
RUN npm run build

# Stage 3: Minimal production image
FROM alpine:latest
RUN apk --no-cache add ca-certificates tzdata
WORKDIR /app
COPY --from=go-builder /build/server ./server
COPY --from=frontend-builder /build/dist ./dist
EXPOSE 8080
CMD ["./server"]
