// R3 — Sign-up Form with Validation   (statement: Practice PDF, Part B)
// Run only this exercise:  npx vitest run R3
// Keep every data-testid exactly as it is: the tests depend on them.
//
// Error messages (use them EXACTLY):
//   name-error     -> "Name is required"
//   email-error    -> "Enter a valid email"
//   password-error -> "Password must be at least 8 characters and contain a number"
//   confirm-error  -> "Passwords do not match"

export default function SignupForm({ onSubmit = () => {} }) {
  // TODO: form values, which fields were touched, submit attempt, success message

  return (
    <div className="card">
      <h2>Create your account</h2>
      <form data-testid="signup-form" noValidate>
        <label>
          Name
          <input data-testid="name-input" name="name" />
        </label>
        {/* <p data-testid="name-error" className="error">...</p> */}

        <label>
          Email
          <input data-testid="email-input" name="email" type="email" />
        </label>
        {/* <p data-testid="email-error" className="error">...</p> */}

        <label>
          Password
          <input data-testid="password-input" name="password" type="password" />
        </label>
        {/* <p data-testid="password-error" className="error">...</p> */}

        <label>
          Confirm password
          <input data-testid="confirm-input" name="confirm" type="password" />
        </label>
        {/* <p data-testid="confirm-error" className="error">...</p> */}

        <button data-testid="submit-button" type="submit">
          Create account
        </button>
      </form>
      {/* <p data-testid="success-message">Welcome, Ada Lovelace!</p> */}
    </div>
  );
}
