// R4 — Product Browser: search + filter + sort   (statement: Practice PDF, Part B)
// Run only this exercise:  npx vitest run R4
// Keep every data-testid exactly as it is: the tests depend on them.

export default function ProductBrowser({ products = [] }) {
  // TODO: state for the search text, the selected category and the sort option

  return (
    <div className="card">
      <h2>Product Browser</h2>

      <div className="row">
        <input data-testid="search-input" placeholder="Search by name..." />

        <select data-testid="category-select">
          <option value="all">All categories</option>
          {/* TODO: one <option> per unique category, sorted A→Z */}
        </select>

        <select data-testid="sort-select">
          <option value="relevance">Relevance</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="rating-desc">Best rated</option>
        </select>
      </div>

      <p data-testid="result-count">Showing 0 of 0 products</p>

      <ul>
        {/* One row per visible product:
            <li data-testid="product-row">
              <span data-testid="product-name">Desk Lamp</span>
              <span data-testid="product-price">$35.50</span>
            </li>
        */}
      </ul>
      {/* When nothing matches: <p data-testid="no-results">No products found</p> */}
    </div>
  );
}
