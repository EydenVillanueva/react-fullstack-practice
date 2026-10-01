// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter.jsx';

const count = () => screen.getByTestId('count');
const stepInput = () => screen.getByTestId('step-input');
const inc = () => screen.getByTestId('increment');
const dec = () => screen.getByTestId('decrement');

describe('R1 Counter', () => {
  it('starts at min with a step of 1', () => {
    render(<Counter />);
    expect(count()).toHaveTextContent('0');
    expect(stepInput()).toHaveValue(1);
  });

  it('increments and decrements by the step', async () => {
    const user = userEvent.setup();
    render(<Counter />);
    await user.click(inc());
    await user.click(inc());
    await user.click(inc());
    await user.click(dec());
    expect(count()).toHaveTextContent('2');
  });

  it('uses the value typed in the step input', async () => {
    const user = userEvent.setup();
    render(<Counter />);
    await user.clear(stepInput());
    await user.type(stepInput(), '5');
    await user.click(inc());
    await user.click(inc());
    expect(count()).toHaveTextContent('10');
  });

  it('disables decrement when it would go below min', () => {
    render(<Counter />);
    expect(dec()).toBeDisabled();
    expect(inc()).toBeEnabled();
  });

  it('disables increment when it would go above max', async () => {
    const user = userEvent.setup();
    render(<Counter max={10} />);
    await user.clear(stepInput());
    await user.type(stepInput(), '4');
    await user.click(inc());
    await user.click(inc());
    expect(count()).toHaveTextContent('8');
    expect(inc()).toBeDisabled(); // 8 + 4 = 12 > 10
  });

  it('disables both buttons when the step is not a positive integer', async () => {
    const user = userEvent.setup();
    render(<Counter min={0} max={100} />);
    await user.click(inc()); // count = 1, so decrement would be possible with step 1
    for (const bad of ['', '0', '-2', '2.5']) {
      await user.clear(stepInput());
      if (bad) await user.type(stepInput(), bad);
      expect(inc()).toBeDisabled();
      expect(dec()).toBeDisabled();
    }
  });

  it('reset goes back to min and keeps the step', async () => {
    const user = userEvent.setup();
    render(<Counter min={5} />);
    expect(count()).toHaveTextContent('5');
    await user.clear(stepInput());
    await user.type(stepInput(), '3');
    await user.click(inc());
    expect(count()).toHaveTextContent('8');
    await user.click(screen.getByTestId('reset'));
    expect(count()).toHaveTextContent('5');
    expect(stepInput()).toHaveValue(3);
  });
});
