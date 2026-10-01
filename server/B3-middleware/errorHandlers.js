// B3 — Middleware   (statement: Practice PDF, Part C)

// 404 for any request that no route handled:
//   404 { error: 'Route not found: GET /api/nope' }   (method + original URL)
export function notFound(req, res, next) {
  // TODO
  next();
}

// Centralized error handler. Express recognizes it because it has FOUR params.
//   status = err.status (or err.statusCode) || 500
//   status < 500  -> { error: err.message }
//   status >= 500 -> log the error with console.error and respond
//                    { error: 'Internal Server Error' }   (never leak internals)
export function errorHandler(err, req, res, next) {
  // TODO
  next(err);
}
