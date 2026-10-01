// B2 — Products API: filtering, sorting and pagination   (statement: Practice PDF, Part C)
// Run only this exercise:  npx vitest run B2
import { Router } from 'express';
import { PRODUCTS } from './products.data.js';

const router = Router();

// TODO: GET /      query params: category, minPrice, maxPrice, sort, page, limit
//                  -> 200 { data, page, limit, total, totalPages } | 400
// TODO: GET /:id   -> 200 product | 404

export default router;
