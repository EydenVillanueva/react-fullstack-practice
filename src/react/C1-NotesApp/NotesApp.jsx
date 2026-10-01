// C1 — Capstone (optional, no automated tests): full-stack Notes app
// Frontend (this file) <-> Backend (server/B1-notes, finish B1 first).
// Run both with:  npm run dev   then open http://localhost:5173 and pick "C1".
//
// Requirements (Practice PDF, Part E):
//  1. On mount: GET /api/notes -> list them (show loading and error states).
//  2. A form with title + content -> POST /api/notes -> add the created note to the list.
//     Show the API's 400 message if the title is empty.
//  3. A Delete button per note -> DELETE /api/notes/:id -> remove it from the list.
//  4. (Bonus) A search box that calls GET /api/notes?search=... (debounced 300 ms).

export default function NotesApp() {
  return (
    <div className="card">
      <h2>Notes (full-stack)</h2>
      <p>TODO: build me.</p>
    </div>
  );
}
