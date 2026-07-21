// Platform rewrites this literal to "<backendURL>/api" on backend deploy.
// Keep it a PLAIN string literal — no import.meta.env, no ?? / || / template.
// Request paths are RELATIVE to BASE and must NOT start with /api (avoids //api//).
export const BASE = '/api';
