// Test helper: builds an in-memory SQLite database from schema.sql and runs
// the query written in one of the exercise files. Returns rows as objects.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import initSqlJs from 'sql.js';

const here = (file) => fileURLToPath(new URL(file, import.meta.url));
const SQL = await initSqlJs();

export function runExercise(file) {
  const db = new SQL.Database();
  db.exec(readFileSync(here('./schema.sql'), 'utf8'));
  const query = readFileSync(here(file), 'utf8')
    .split('\n')
    .filter((line) => !line.trim().startsWith('--'))
    .join('\n')
    .trim();
  if (!query) throw new Error(`${file} is empty: write your query below the comments.`);
  const results = db.exec(query);
  db.close();
  if (results.length === 0) return [];
  const { columns, values } = results[results.length - 1]; // last statement wins
  return values.map((row) => Object.fromEntries(row.map((v, i) => [columns[i], v])));
}

// Lets you explore the data:  node sql/runQuery.js "SELECT * FROM orders"
if (process.argv[1] === fileURLToPath(import.meta.url) && process.argv[2]) {
  const db = new SQL.Database();
  db.exec(readFileSync(here('./schema.sql'), 'utf8'));
  for (const { columns, values } of db.exec(process.argv[2])) {
    console.table(values.map((row) => Object.fromEntries(row.map((v, i) => [columns[i], v]))));
  }
}
