// R5 — Stopwatch with Laps   (statement: Practice PDF, Part B)
// Run only this exercise:  npx vitest run R5
// Keep every data-testid exactly as it is: the tests depend on them.

export default function Stopwatch() {
  // TODO: elapsed time (in tenths of a second), running flag, laps

  return (
    <div className="card">
      <h2>Stopwatch</h2>
      <p className="display" data-testid="time-display">
        00:00.0
      </p>
      <div className="row">
        <button data-testid="start-button">Start</button>
        <button data-testid="stop-button">Stop</button>
        <button data-testid="lap-button">Lap</button>
        <button data-testid="reset-button">Reset</button>
      </div>
      <ol>
        {/* One item per lap, oldest first:
            <li data-testid="lap-item">Lap 1: 00:01.2</li> */}
      </ol>
    </div>
  );
}
