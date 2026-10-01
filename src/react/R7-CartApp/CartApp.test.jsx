// @vitest-environment jsdom
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import CartApp from './CartApp.jsx';
import { useCart } from './CartContext.jsx';

function renderAt(path = '/') {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={[path]}>
      <CartApp />
    </MemoryRouter>,
  );
  return user;
}
const count = () => screen.getByTestId('cart-count');

describe('R7 CartApp', () => {
  it('lists the catalog on "/" with an empty cart', () => {
    renderAt('/');
    expect(screen.getAllByTestId('product-card')).toHaveLength(4);
    expect(count()).toHaveTextContent('0');
  });

  it('adding the same product twice increases its quantity', async () => {
    const user = renderAt('/');
    await user.click(screen.getByTestId('add-1'));
    await user.click(screen.getByTestId('add-1'));
    await user.click(screen.getByTestId('add-3'));
    expect(count()).toHaveTextContent('3');
  });

  it('keeps the cart when navigating to /cart and shows quantities + total', async () => {
    const user = renderAt('/');
    await user.click(screen.getByTestId('add-1'));
    await user.click(screen.getByTestId('add-1'));
    await user.click(screen.getByTestId('add-3'));
    await user.click(screen.getByTestId('nav-cart'));

    const items = screen.getAllByTestId('cart-item');
    expect(items).toHaveLength(2);
    expect(within(items[0]).getByText(/Wireless Mouse/)).toBeInTheDocument();
    expect(screen.getByTestId('qty-1')).toHaveTextContent('2');
    expect(screen.getByTestId('qty-3')).toHaveTextContent('1');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('Total: $110.00');
  });

  it('formats the total with 2 decimals (floating point!)', async () => {
    const user = renderAt('/');
    await user.click(screen.getByTestId('add-2'));
    await user.click(screen.getByTestId('add-4'));
    await user.click(screen.getByTestId('nav-cart'));
    expect(screen.getByTestId('cart-total')).toHaveTextContent('Total: $55.24');
  });

  it('increment / decrement; decrementing at quantity 1 removes the item', async () => {
    const user = renderAt('/');
    await user.click(screen.getByTestId('add-2'));
    await user.click(screen.getByTestId('nav-cart'));
    await user.click(screen.getByTestId('inc-2'));
    expect(screen.getByTestId('qty-2')).toHaveTextContent('2');
    expect(count()).toHaveTextContent('2');
    await user.click(screen.getByTestId('dec-2'));
    await user.click(screen.getByTestId('dec-2'));
    expect(screen.queryAllByTestId('cart-item')).toHaveLength(0);
    expect(screen.getByTestId('cart-empty')).toHaveTextContent('Your cart is empty');
    expect(count()).toHaveTextContent('0');
  });

  it('remove and clear', async () => {
    const user = renderAt('/');
    await user.click(screen.getByTestId('add-1'));
    await user.click(screen.getByTestId('add-2'));
    await user.click(screen.getByTestId('add-4'));
    await user.click(screen.getByTestId('nav-cart'));
    await user.click(screen.getByTestId('remove-2'));
    expect(screen.getAllByTestId('cart-item')).toHaveLength(2);
    await user.click(screen.getByTestId('clear-cart'));
    expect(screen.getByTestId('cart-empty')).toBeInTheDocument();
  });

  it('going back to Products keeps the cart', async () => {
    const user = renderAt('/cart');
    expect(screen.getByTestId('cart-empty')).toBeInTheDocument();
    await user.click(screen.getByTestId('nav-products'));
    await user.click(screen.getByTestId('add-4'));
    await user.click(screen.getByTestId('nav-cart'));
    expect(screen.getByTestId('qty-4')).toHaveTextContent('1');
  });

  it('shows a not-found page for unknown routes (header still visible)', () => {
    renderAt('/does-not-exist');
    expect(screen.getByTestId('not-found')).toHaveTextContent('Page not found');
    expect(screen.getByTestId('nav-cart')).toBeInTheDocument();
  });

  it('useCart throws a clear error outside of the provider', () => {
    function Probe() {
      useCart();
      return null;
    }
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Probe />)).toThrow('useCart must be used inside a CartProvider');
    spy.mockRestore();
  });
});
