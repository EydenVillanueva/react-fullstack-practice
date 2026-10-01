// The Express app is built by a FACTORY function so every test gets a fresh
// app (with fresh in-memory data). server/index.js calls it and listens on a port.
import express from 'express';
import cors from 'cors';
import { USERS } from './data/users.js';
import { createNotesRouter } from './B1-notes/notesRouter.js';
import productsRouter from './B2-products/productsRouter.js';
import adminRouter from './B3-middleware/adminRouter.js';
import { requireApiKey } from './B3-middleware/requireApiKey.js';
import { notFound, errorHandler } from './B3-middleware/errorHandlers.js';

export function createApp() {
  const app = express();

  app.use(cors()); // allow browser calls from other origins (e.g. a React app on :5173)
  app.use(express.json()); // parse JSON bodies into req.body

  app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
  app.get('/api/users', (req, res) => res.json(USERS)); // used by R6 in the playground

  app.use('/api/notes', createNotesRouter()); // B1
  app.use('/api/products', productsRouter); // B2
  app.use('/api/admin', requireApiKey, adminRouter); // B3 (middleware runs first)

  // B3: these two MUST be registered last.
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
