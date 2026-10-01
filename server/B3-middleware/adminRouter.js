// Provided (not an exercise). These routes exist to exercise YOUR middleware.
import { Router } from 'express';
import { HttpError } from './HttpError.js';

const router = Router();

router.get('/stats', (req, res) => res.json({ users: 5, notes: 2 }));

// A "client" error: the error handler should expose this message.
router.get('/bad-request', () => {
  throw new HttpError(400, 'Missing report id');
});

// "Server" errors: the error handler must NOT leak these messages.
router.get('/crash', () => {
  throw new Error('Database connection lost');
});
router.get('/async-crash', async () => {
  await Promise.resolve();
  throw new Error('Timeout talking to payments'); // Express 5 forwards rejected promises to next(err)
});

export default router;
