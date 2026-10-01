// R2 — Todo List with Filters   (statement: Practice PDF, Part B)
// Run only this exercise:  npx vitest run R2
// Keep every data-testid exactly as it is: the tests depend on them.

export default function TodoList() {
  // TODO: state for the todos, the input text and the current filter

  return (
    <div className="card">
      <h2>Todo List</h2>

      <form data-testid="todo-form">
        <input data-testid="todo-input" placeholder="What needs to be done?" />
        <button data-testid="add-button" type="submit">
          Add
        </button>
      </form>

      <div className="row">
        <button data-testid="filter-all">All</button>
        <button data-testid="filter-active">Active</button>
        <button data-testid="filter-completed">Completed</button>
      </div>

      <ul data-testid="todo-list">
        {/* Render one item per VISIBLE todo, with this structure:
            <li data-testid="todo-item">
              <input type="checkbox" data-testid="todo-checkbox" />
              <span data-testid="todo-text">Buy milk</span>
              <button data-testid="todo-delete">Delete</button>
            </li>
        */}
      </ul>

      <p data-testid="items-left">0 items left</p>
    </div>
  );
}
