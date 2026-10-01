// R7 — Mini Shop (Context + useReducer + React Router)   (statement: Practice PDF, Part B)
// Run only this exercise:  npx vitest run R7
import { createContext, useContext } from 'react';

const CartContext = createContext(null);

// TODO: implement the reducer. Suggested actions:
//   { type: 'add', product }   { type: 'increment', id }   { type: 'decrement', id }
//   { type: 'remove', id }     { type: 'clear' }
// State shape suggestion: { items: [{ id, name, price, qty }] }
export function cartReducer(state, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  // TODO: useReducer(cartReducer, initialState) and expose state + actions via value
  return <CartContext.Provider value={null}>{children}</CartContext.Provider>;
}

export function useCart() {
  // TODO: read the context and throw
  //   new Error('useCart must be used inside a CartProvider')
  // when there is no provider above this component.
  return useContext(CartContext);
}
