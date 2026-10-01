import { CATALOG } from './catalog.js';

export default function ProductsPage() {
  // TODO: get the "add" action from the cart
  return (
    <div className="grid">
      {CATALOG.map((p) => (
        <article key={p.id} data-testid="product-card" className="product">
          <h3>{p.name}</h3>
          <p>${p.price.toFixed(2)}</p>
          <button data-testid={`add-${p.id}`}>Add to cart</button>
        </article>
      ))}
    </div>
  );
}
