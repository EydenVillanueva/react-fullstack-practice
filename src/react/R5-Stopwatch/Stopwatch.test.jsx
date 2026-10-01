// @vitest-environment jsdom
import { act, fireEvent, render, screen } from '@testing-library/react';
import Stopwatch from './Stopwatch.jsx';

const display = () => screen.getByTestId('time-display');
const click = (id) => fireEvent.click(screen.getByTestId(id));
const advance = (ms) => act(() => vi.advanceTimersByTime(ms));

describe('R5 Stopwatch', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('starts at 00:00.0 with the right buttons enabled', () => {
    render(<Stopwatch />);
    expect(display()).toHaveTextContent('00:00.0');
    expect(screen.getByTestId('start-button')).toBeEnabled();
    expect(screen.getByTestId('stop-button')).toBeDisabled();
    expect(screen.getByTestId('lap-button')).toBeDisabled();
  });

  it('counts tenths of a second while running', () => {
    render(<Stopwatch />);
    click('start-button');
    advance(1500);
    expect(display()).toHaveTextContent('00:01.5');
    expect(screen.getByTestId('start-button')).toBeDisabled();
    expect(screen.getByTestId('reset-button')).toBeDisabled();
  });

  it('stop pauses and start resumes from the same time', () => {
    render(<Stopwatch />);
    click('start-button');
    advance(1500);
    click('stop-button');
    advance(3000);
    expect(display()).toHaveTextContent('00:01.5');
    click('start-button');
    advance(500);
    expect(display()).toHaveTextContent('00:02.0');
  });

  it('formats minutes as mm:ss.t', () => {
    render(<Stopwatch />);
    click('start-button');
    advance(65300);
    expect(display()).toHaveTextContent('01:05.3');
  });

  it('records laps in order', () => {
    render(<Stopwatch />);
    click('start-button');
    advance(1200);
    click('lap-button');
    advance(800);
    click('lap-button');
    const laps = screen.getAllByTestId('lap-item').map((li) => li.textContent);
    expect(laps).toEqual(['Lap 1: 00:01.2', 'Lap 2: 00:02.0']);
  });

  it('reset (only when stopped) clears the time and the laps', () => {
    render(<Stopwatch />);
    click('start-button');
    advance(700);
    click('lap-button');
    click('stop-button');
    click('reset-button');
    expect(display()).toHaveTextContent('00:00.0');
    expect(screen.queryAllByTestId('lap-item')).toHaveLength(0);
  });

  it('does not leak intervals: stop and unmount clear the timer', () => {
    const { unmount } = render(<Stopwatch />);
    click('start-button');
    advance(300);
    click('stop-button');
    expect(vi.getTimerCount()).toBe(0);
    click('start-button');
    advance(300);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
