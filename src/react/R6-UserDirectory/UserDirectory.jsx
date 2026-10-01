// R6 — User Directory: fetch + loading/error/retry + search   (statement: Practice PDF, Part B)
// Run only this exercise:  npx vitest run R6
// In the playground this calls the real Express server (npm run dev starts both).
// Keep every data-testid exactly as it is: the tests depend on them.

export default function UserDirectory() {
  // TODO: status ('loading' | 'error' | 'success'), users, search text
  // TODO: fetch GET /api/users when the component mounts (and again on Retry)

  return (
    <div className="card">
      <h2>User Directory</h2>
      {/* loading:  <p data-testid="loading">Loading users...</p>
          error:    <p data-testid="error">Could not load users</p>
                    <button data-testid="retry-button">Retry</button>
          success:  <input data-testid="user-search" placeholder="Filter by name" />
                    <ul> <li data-testid="user-item">Ana Torres — ana@example.com</li> </ul>
                    no match: <p data-testid="no-users">No users match</p>          */}
    </div>
  );
}
