// @vitest-environment jsdom
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductBrowser from './ProductBrowser.jsx';

// Frozen: calling .sort() / .reverse() / .push() on it throws a TypeError.
const PRODUCTS = Object.freeze([
  { id: 1, name: 'Mechanical Keyboard', category: 'Electronics', price: 89.9, rating: 4.6 },
  { id: 2, name: 'Desk Lamp', category: 'Furniture', price: 35.5, rating: 4.1 },
  { id: 3, name: 'USB-C Hub', category: 'Electronics', price: 45, rating: 4.3 },
  { id: 4, name: 'Standing Desk', category: 'Furniture', price: 420, rating: 4.8 },
  { id: 5, name: 'Lava LAMP', category: 'Decor', price: 24.99, rating: 4.1 },
]);

const names = () => screen.queryAllByTestId('product-name').map((el) => el.textContent);
const setup = () => {
  const user = userEvent.setup();
  render(<ProductBrowser products={PRODUCTS} />);
  return user;
};

describe('R4 ProductBrowser', () => {
  it('renders every product in the original order with formatted prices', () => {
    setup();
    expect(names()).toEqual([
      'Mechanical Keyboard',
      'Desk Lamp',
      'USB-C Hub',
      'Standing Desk',
      'Lava LAMP',
    ]);
    const firstRow = screen.getAllByTestId('product-row')[0];
    expect(within(firstRow).getByTestId('product-price')).toHaveTextContent('$89.90');
    expect(screen.getByTestId('result-count')).toHaveTextContent('Showing 5 of 5 products');
  });

  it('derives the category options (unique, sorted A→Z) after "All categories"', () => {
    setup();
    const options = within(screen.getByTestId('category-select'))
      .getAllByRole('option')
      .map((o) => o.value);
    expect(options).toEqual(['all', 'Decor', 'Electronics', 'Furniture']);
  });

  it('searches by name, case-insensitive and trimmed', async () => {
    const user = setup();
    await user.type(screen.getByTestId('search-input'), '  lamp ');
    expect(names()).toEqual(['Desk Lamp', 'Lava LAMP']);
    expect(screen.getByTestId('result-count')).toHaveTextContent('Showing 2 of 5 products');
  });

  it('combines search and category filters', async () => {
    const user = setup();
    await user.selectOptions(screen.getByTestId('category-select'), 'Furniture');
    expect(names()).toEqual(['Desk Lamp', 'Standing Desk']);
    await user.type(screen.getByTestId('search-input'), 'lamp');
    expect(names()).toEqual(['Desk Lamp']);
  });

  it('sorts by price in both directions without mutating the prop', async () => {
    const user = setup();
    await user.selectOptions(screen.getByTestId('sort-select'), 'price-asc');
    expect(names()).toEqual(['Lava LAMP', 'Desk Lamp', 'USB-C Hub', 'Mechanical Keyboard', 'Standing Desk']);
    await user.selectOptions(screen.getByTestId('sort-select'), 'price-desc');
    expect(names()).toEqual(['Standing Desk', 'Mechanical Keyboard', 'USB-C Hub', 'Desk Lamp', 'Lava LAMP']);
    await user.selectOptions(screen.getByTestId('sort-select'), 'relevance');
    expect(names()[0]).toBe('Mechanical Keyboard');
  });

  it('sorts by rating (best first) and keeps the original order for ties', async () => {
    const user = setup();
    await user.selectOptions(screen.getByTestId('sort-select'), 'rating-desc');
    expect(names()).toEqual(['Standing Desk', 'Mechanical Keyboard', 'USB-C Hub', 'Desk Lamp', 'Lava LAMP']);
  });

  it('shows a message when nothing matches', async () => {
    const user = setup();
    await user.type(screen.getByTestId('search-input'), 'spaceship');
    expect(screen.queryAllByTestId('product-row')).toHaveLength(0);
    expect(screen.getByTestId('no-results')).toHaveTextContent('No products found');
    expect(screen.getByTestId('result-count')).toHaveTextContent('Showing 0 of 5 products');
  });
});
