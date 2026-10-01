// B3 — Middleware   (statement: Practice PDF, Part C)
// Run only this exercise:  npx vitest run B3
//
// Header:        x-api-key
// Valid key:     process.env.API_KEY, or 'dev-secret' when it is not set
// Missing key -> 401 { error: 'Missing API key' }
// Wrong key   -> 401 { error: 'Invalid API key' }
// Valid key   -> let the request continue

export function requireApiKey(req, res, next) {
  // TODO
  next();
}
