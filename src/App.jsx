// Playground: renders each exercise so you can SEE and click it in the browser.
// You do not need to edit this file.
import { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import Counter from './react/R1-Counter/Counter.jsx';
import TodoList from './react/R2-TodoList/TodoList.jsx';
import SignupForm from './react/R3-SignupForm/SignupForm.jsx';
import ProductBrowser from './react/R4-ProductBrowser/ProductBrowser.jsx';
import { PRODUCTS } from './react/R4-ProductBrowser/products.js';
import Stopwatch from './react/R5-Stopwatch/Stopwatch.jsx';
import UserDirectory from './react/R6-UserDirectory/UserDirectory.jsx';
import CartApp from './react/R7-CartApp/CartApp.jsx';
import NotesApp from './react/C1-NotesApp/NotesApp.jsx';

const EXERCISES = [
  { id: 'R1', title: 'Bounded Counter', render: () => <Counter min={0} max={20} /> },
  { id: 'R2', title: 'Todo List', render: () => <TodoList /> },
  {
    id: 'R3',
    title: 'Sign-up Form',
    render: () => <SignupForm onSubmit={(data) => console.log('submitted', data)} />,
  },
  { id: 'R4', title: 'Product Browser', render: () => <ProductBrowser products={PRODUCTS} /> },
  { id: 'R5', title: 'Stopwatch', render: () => <Stopwatch /> },
  { id: 'R6', title: 'User Directory (API)', render: () => <UserDirectory /> },
  {
    id: 'R7',
    title: 'Mini Shop (Router)',
    render: () => (
      <MemoryRouter>
        <CartApp />
      </MemoryRouter>
    ),
  },
  { id: 'C1', title: 'Notes (full-stack)', render: () => <NotesApp /> },
];

export default function App() {
  const [current, setCurrent] = useState('R1');
  const exercise = EXERCISES.find((e) => e.id === current);

  return (
    <div className="layout">
      <aside>
        <h1>Practice</h1>
        {EXERCISES.map((e) => (
          <button
            key={e.id}
            className={e.id === current ? 'active' : ''}
            onClick={() => setCurrent(e.id)}
          >
            <b>{e.id}</b> {e.title}
          </button>
        ))}
        <p className="hint">Tests: npx vitest run {current}</p>
      </aside>
      {/* key={current}: switching exercises remounts it with fresh state */}
      <main key={current}>{exercise.render()}</main>
    </div>
  );
}
