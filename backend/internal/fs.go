package internal

import "embed"

// DistFS embeds the built SPA. The directory is relative to THIS file, so it
// must be internal/dist/ (a placeholder index.html is committed so the embed
// compiles). In the imagine.bo deploy the real frontend is served separately.
//
//go:embed all:dist
var DistFS embed.FS
