// @vitest-environment jsdom
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from './TodoList.jsx';

async function addTodo(user, text, { withEnter = false } = {}) {
  await user.type(screen.getByTestId('todo-input'), withEnter ? `${text}{Enter}` : text);
  if (!withEnter) await user.click(screen.getByTestId('add-button'));
}
const items = () => screen.queryAllByTestId('todo-item');
const texts = () => screen.queryAllByTestId('todo-text').map((el) => el.textContent);

describe('R2 TodoList', () => {
  it('starts empty', () => {
    render(<TodoList />);
    expect(items()).toHaveLength(0);
    expect(screen.getByTestId('items-left')).toHaveTextContent('0 items left');
  });

  it('adds todos with the button and with Enter, then clears the input', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    await addTodo(user, 'Study hooks');
    await addTodo(user, 'Practice SQL', { withEnter: true });
    expect(texts()).toEqual(['Study hooks', 'Practice SQL']);
    expect(screen.getByTestId('todo-input')).toHaveValue('');
  });

  it('trims text and ignores empty input', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    await addTodo(user, '   ');
    expect(items()).toHaveLength(0);
    await addTodo(user, '  Read docs  ');
    expect(texts()).toEqual(['Read docs']);
  });

  it('toggles completion and updates the counter (singular/plural)', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    await addTodo(user, 'A');
    await addTodo(user, 'B');
    expect(screen.getByTestId('items-left')).toHaveTextContent('2 items left');

    const first = items()[0];
    await user.click(within(first).getByTestId('todo-checkbox'));
    expect(within(first).getByTestId('todo-checkbox')).toBeChecked();
    expect(within(first).getByTestId('todo-text')).toHaveClass('done');
    expect(screen.getByTestId('items-left')).toHaveTextContent('1 item left');

    await user.click(within(first).getByTestId('todo-checkbox'));
    expect(within(first).getByTestId('todo-text')).not.toHaveClass('done');
    expect(screen.getByTestId('items-left')).toHaveTextContent('2 items left');
  });

  it('deletes a todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    await addTodo(user, 'A');
    await addTodo(user, 'B');
    await addTodo(user, 'C');
    await user.click(within(items()[1]).getByTestId('todo-delete'));
    expect(texts()).toEqual(['A', 'C']);
  });

  it('filters All / Active / Completed and marks the active filter', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    await addTodo(user, 'A');
    await addTodo(user, 'B');
    await addTodo(user, 'C');
    await user.click(within(items()[1]).getByTestId('todo-checkbox')); // B done

    await user.click(screen.getByTestId('filter-active'));
    expect(texts()).toEqual(['A', 'C']);
    expect(screen.getByTestId('filter-active')).toHaveClass('active');
    expect(screen.getByTestId('filter-all')).not.toHaveClass('active');

    await user.click(screen.getByTestId('filter-completed'));
    expect(texts()).toEqual(['B']);
    // the counter always counts ALL pending todos, regardless of the filter
    expect(screen.getByTestId('items-left')).toHaveTextContent('2 items left');

    await user.click(screen.getByTestId('filter-all'));
    expect(texts()).toEqual(['A', 'B', 'C']);
    expect(screen.getByTestId('filter-all')).toHaveClass('active');
  });

  it('a todo completed while filtering "Active" disappears from the view', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    await addTodo(user, 'A');
    await addTodo(user, 'B');
    await user.click(screen.getByTestId('filter-active'));
    await user.click(within(items()[0]).getByTestId('todo-checkbox'));
    expect(texts()).toEqual(['B']);
  });
});
