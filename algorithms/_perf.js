// Helper used by the "performance" tests. It measures how long a call takes.
// HackerRank runs hidden test cases with large inputs: an O(n^2) solution
// that passes the samples can still fail with "Terminated due to timeout".
export function timed(fn) {
  const start = performance.now();
  const result = fn();
  return { result, ms: performance.now() - start };
}

export const TIME_LIMIT_MS = 500;
