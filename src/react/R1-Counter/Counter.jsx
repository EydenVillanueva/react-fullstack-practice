// R1 — Bounded Counter   (statement: Practice PDF, Part B)
// Run only this exercise:  npx vitest run R1
// Keep every data-testid exactly as it is: the tests depend on them.

export default function Counter({ min = 0, max = 100 }) {
  // TODO: add state for the count and for the step input

  return (
    <div className="card">
      <h2>Bounded Counter</h2>
      <p>
        Count: <span data-testid="count">0</span>
      </p>
      <label>
        Step <input data-testid="step-input" type="number" />
      </label>
      <div className="row">
        <button data-testid="decrement">−</button>
        <button data-testid="increment">+</button>
        <button data-testid="reset">Reset</button>
      </div>
    </div>
  );
}
