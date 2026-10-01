// B1 — Notes CRUD API   (statement: Practice PDF, Part C)
// Run only this exercise:  npx vitest run B1
import { Router } from 'express';

const SEED = [
  { id: 1, title: 'Study closures', content: 'Functions remember their scope' },
  { id: 2, title: 'Practice SQL', content: 'GROUP BY + HAVING' },
];

// Factory: every call returns a router with its OWN copy of the data.
export function createNotesRouter() {
  const router = Router();
  const notes = SEED.map((n) => ({ ...n }));
  let nextId = 3;

  // TODO: GET    /            -> 200 list (supports ?search=)
  // TODO: GET    /:id         -> 200 note | 404
  // TODO: POST   /            -> 201 created | 400
  // TODO: PUT    /:id         -> 200 updated | 400 | 404
  // TODO: DELETE /:id         -> 204 | 404

  return router;
}
