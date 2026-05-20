import React, { useState, useRef } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import CheckoutScreen from './Screens/CheckoutScreen';
import OrderConfirmationScreen from './Screens/OrderConfirmationScreen';
import SignInScreen from './Screens/SignInScreen';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState({ visible: false, title: '', message: '', variant: 'success' });
  const toastTimer = useRef(null);

  const showToast = (title, message, variant = 'success') => {
    if (toastTimer.current) {
      window.clearTimeout(toastTimer.current);
    }
    setToast({ visible: true, title, message, variant });
    toastTimer.current = window.setTimeout(() => {
      setToast((current) => ({ ...current, visible: false }));
      toastTimer.current = null;
    }, 1800);
  };

  const closeToast = () => {
    if (toastTimer.current) {
      window.clearTimeout(toastTimer.current);
      toastTimer.current = null;
    }
    setToast((current) => ({ ...current, visible: false }));
  };

  const handleSignIn = (userData) => {
    setUser(userData);
  };

  const handleSignOut = () => {
    setUser(null);
  };

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };

  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };

  const addToCart = (product, qty = 1) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item._id === product._id);
      if (existing) {
        return prevItems.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prevItems, { ...product, qty }];
    });
    showToast('Added to cart', `${product.name} has been added to your cart.`, 'info');
  };

  const updateQty = (productId, qty) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item._id === productId ? { ...item, qty: Math.max(1, qty) } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartQty = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button className="menu-button" onClick={openMenu}>
              &#9776;
            </button>
            <Link className="brand-link" to="/">Vegmazon</Link>
          </div>

          <div className="search-bar">
            <input type="text" placeholder="Search vegetables, snacks, groceries..." />
            <button className="search-button">Search</button>
          </div>

          <div className="header-links">
            <Link to="/cart">Cart ({cartQty})</Link>
            {user ? (
              <>
                <span className="user-greeting">Hi, {user.name}</span>
                <button className="signout-button" onClick={handleSignOut}>Sign Out</button>
              </>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </header>

        <aside className="sidebar">
          <div className="sidebar-header">
            <h3>Shopping Categories</h3>
            <button className="sidebar-close-button" onClick={closeMenu}>×</button>
          </div>
          <ul>
            <li>
              <Link to="/category/all-products">All products</Link>
            </li>
            <li>
              <Link to="/category/fruits-and-vegetables">Fruits & Vegetables</Link>
            </li>
            <li>
              <Link to="/category/fast-food">Fast Food</Link>
            </li>
            <li>
              <Link to="/category/groceries">Groceries</Link>
            </li>
          </ul>
        </aside>

        <main className="main">
          <div className="content">
            <Route
              path="/cart"
              render={(props) => (
                <CartScreen
                  {...props}
                  cartItems={cartItems}
                  updateQty={updateQty}
                  removeFromCart={removeFromCart}
                />
              )}
            />
            <Route path="/checkout/success" exact render={(props) => (
              <OrderConfirmationScreen
                {...props}
                user={user}
              />
            )} />
            <Route path="/checkout" exact render={(props) => (
              <CheckoutScreen
                {...props}
                cartItems={cartItems}
                user={user}
                clearCart={clearCart}
                onOrderPlaced={() => showToast('Order placed', 'Your order was placed successfully!', 'success')}
              />
            )} />
            <Route path="/product/:id" render={(props) => <ProductScreen {...props} addToCart={addToCart} />} />
            <Route path="/signin" render={(props) => <SignInScreen {...props} onSignIn={handleSignIn} />} />
            <Route path="/category/:categorySlug" render={(props) => <HomeScreen {...props} addToCart={addToCart} />} />
            <Route path="/" exact={true} render={(props) => <HomeScreen {...props} addToCart={addToCart} />} />
          </div>
        </main>

        {toast.visible && (
          <div className={`toast-overlay toast-${toast.variant}`} onClick={closeToast}>
            <div className="toast-card" onClick={(e) => e.stopPropagation()}>
              <div className="toast-title">{toast.title}</div>
              <div className="toast-message">{toast.message}</div>
              <button className="secondary-button toast-close" onClick={closeToast}>
                Close
              </button>
            </div>
          </div>
        )}

        <footer className="footer">
          <div>Vegmazon</div>
          <div>Built with React · Dark modern UI</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
