import React, { useState } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import SignInScreen from './Screens/SignInScreen';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

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
            <Route path="/product/:id" render={(props) => <ProductScreen {...props} addToCart={addToCart} />} />
            <Route path="/signin" render={(props) => <SignInScreen {...props} onSignIn={handleSignIn} />} />
            <Route path="/category/:categorySlug" render={(props) => <HomeScreen {...props} addToCart={addToCart} />} />
            <Route path="/" exact={true} render={(props) => <HomeScreen {...props} addToCart={addToCart} />} />
          </div>
        </main>

        <footer className="footer">
          <div>Vegmazon</div>
          <div>Built with React · Dark modern UI</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
