# React + Full-stack Practice Workspace

Hands-on companion for the **Practice PDF**. Every exercise comes with automated
tests, like HackerRank project questions: you write code until the tests pass,
without seeing a solution. Statements, hints and solutions live in the PDF.

| Part | Folder | Exercises | Tools |
|------|--------|-----------|-------|
| A. Algorithms (JS) | `algorithms/` | E01–E10 (easy), M01–M02 (medium) | Vitest |
| B. React | `src/react/` | R1–R7 | React Testing Library |
| C. Node / Express | `server/` | B1–B3 | Supertest |
| D. SQL | `sql/` | S1–S5 | sql.js (SQLite in memory) |
| E. Capstone (optional) | `src/react/C1-NotesApp` + `server/` | C1 | Browser |

## Requirements

- Node.js **20 or newer** (22 LTS recommended) and npm.

## Setup (once)

```bash
cd react-fullstack-practice
npm install
git init && git add -A && git commit -m "Initial stubs"   # optional: lets you reset any exercise
```

To reset an exercise later: `git checkout -- algorithms/E06-twoSum.js`

## The practice loop

1. Read the statement in the Practice PDF (put the PDF on one half of the screen, your editor on the other).
2. Open the stub file (it says `// Write your code here` or `// TODO`).
3. Start the tests for that exercise in **watch mode** (they re-run every time you save):

```bash
npx vitest E06        # algorithms: E01..E10, M01, M02
npx vitest R3         # React: R1..R7
npx vitest B1         # Express: B1..B3
npx vitest S2         # SQL: S1..S5
```

4. Stuck for 20+ minutes? Open **Hint 1** in the PDF. Still stuck after 10 more? **Hint 2**. Solutions are last.

Keep every `data-testid` exactly as written in the stubs. The tests find elements by them, just like HackerRank.

## All commands

| Command | What it does |
|---------|--------------|
| `npm test` | All tests in watch mode |
| `npm run test:run` | All tests once (CI style) |
| `npm run test:algo` / `test:react` / `test:api` / `test:sql` | One part only |
| `npx vitest run E06` | One exercise, once |
| `npm run dev` | Playground (http://localhost:5173) + API (http://localhost:3001) |
| `npm run web` / `npm run api` | Only the frontend / only the API |
| `node sql/runQuery.js "SELECT * FROM orders"` | Explore the SQL practice data |

## Playground (see your components)

`npm run dev` opens a small app where you can click through R1–R7 and C1.
Vite forwards every `/api/*` request to the Express server (see `vite.config.js`),
so `fetch('/api/users')` from React reaches `server/app.js` without CORS problems.

Try the API by hand while it runs:

```bash
curl localhost:3001/api/notes
curl -X POST localhost:3001/api/notes -H "Content-Type: application/json" -d '{"title":"Hello"}'
curl "localhost:3001/api/products?category=electronics&sort=-price&limit=3"
curl localhost:3001/api/admin/stats -H "x-api-key: dev-secret"
```

## Project structure

```
algorithms/           E01..M02 stubs + tests (_perf.js = timing helper)
src/
  App.jsx             playground (you do not need to edit it)
  react/R1..R7        one folder per exercise: Component.jsx + Component.test.jsx
  react/C1-NotesApp   optional full-stack capstone (no tests)
server/
  app.js              builds the Express app (routers + middleware)
  index.js            starts it on port 3001
  B1-notes/           CRUD router            (exercise)
  B2-products/        query params router     (exercise)
  B3-middleware/      API key + 404 + errors  (exercise)
sql/
  schema.sql          tables + seed data
  S1..S5 *.sql        write your query in each file
  runQuery.js         test helper + data explorer
```

## Notes

- **Vitest vs Jest:** the API is the same (`describe`, `it`, `expect`, `beforeEach`).
  Vitest's `vi.fn()` / `vi.spyOn()` / `vi.useFakeTimers()` are Jest's `jest.fn()` / `jest.spyOn()` / `jest.useFakeTimers()`.
  HackerRank React projects usually run Jest + React Testing Library, so what you learn here transfers 1:1.
- **Performance tests** (E03, E04, E06, E08, M01) use large inputs, like HackerRank's hidden test cases.
  A correct but O(n²) solution will fail them with a message like `expected 1740 to be less than 500`.
- React test files start with `// @vitest-environment jsdom` (a fake browser). Algorithm, API and SQL tests run in plain Node.
- `npm audit` may report a moderate advisory in the Vitest 3 dev dependency. It only affects the local test runner
  (nothing is deployed). The version is pinned so the project installs cleanly on Node 20+.
