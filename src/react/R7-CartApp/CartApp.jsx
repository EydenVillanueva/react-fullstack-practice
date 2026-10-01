// R7 — Mini Shop   (statement: Practice PDF, Part B)
// The router itself (BrowserRouter / MemoryRouter) is provided OUTSIDE this
// component (by the playground or by the tests). Here you only declare <Routes>.
import { Link, Route, Routes } from 'react-router-dom';
import { CartProvider } from './CartContext.jsx';
import ProductsPage from './ProductsPage.jsx';
import CartPage from './CartPage.jsx';

function Header() {
  // TODO: show the TOTAL QUANTITY of items in the cart
  return (
    <nav className="row">
      <Link to="/" data-testid="nav-products">
        Products
      </Link>
      <Link to="/cart" data-testid="nav-cart">
        Cart (<span data-testid="cart-count">0</span>)
      </Link>
    </nav>
  );
}

export default function CartApp() {
  // TODO: wrap the app with <CartProvider> so the cart survives navigation
  return (
    <div className="card">
      <h2>Mini Shop</h2>
      <Header />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        {/* TODO: "/cart" -> <CartPage />
            TODO: any other path -> <p data-testid="not-found">Page not found</p> */}
      </Routes>
    </div>
  );
}
