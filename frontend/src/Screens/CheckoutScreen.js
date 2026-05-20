import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CheckoutScreen({ cartItems, user, clearCart, onOrderPlaced, history }) {
  const [shippingAddress, setShippingAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add items to your cart before checking out.</p>
          <Link className="secondary-button" to="/">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="checkout-page">
        <div className="signin-prompt-card">
          <h2>Sign in to checkout</h2>
          <p>You need to sign in before you can place your order.</p>
          <Link className="primary-button" to="/signin?redirect=/checkout">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const placeOrderHandler = (event) => {
    event.preventDefault();
    setError('');

    if (!shippingAddress || !city || !postalCode || !country) {
      setError('Please complete all shipping fields before placing your order.');
      return;
    }

    const orderDetails = {
      orderNumber: Math.floor(100000 + Math.random() * 900000),
      customerName: user?.name || 'Customer',
      totalItems,
      totalPrice,
      shippingAddress,
      city,
      postalCode,
      country,
      items: cartItems.map((item) => ({
        name: item.name,
        qty: item.qty,
        total: item.qty * item.price,
      })),
    };

    if (clearCart) {
      clearCart();
    }
    if (onOrderPlaced) {
      onOrderPlaced();
    }

    history.push('/checkout/success', { orderDetails });
  };

  return (
    <div className="checkout-page">
      <div className="page-header">
        <h1>Checkout</h1>
        <p>Review your order and enter shipping information.</p>
      </div>

      <div className="checkout-layout">
          <form className="checkout-form" onSubmit={placeOrderHandler}>
            <div className="checkout-card">
              <h2>Shipping details</h2>
              {error && <div className="form-error">{error}</div>}
              <label>
                Address
                <input
                  type="text"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="123 Main Street"
                />
              </label>
              <label>
                City
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                />
              </label>
              <label>
                Postal Code
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Postal code"
                />
              </label>
              <label>
                Country
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country"
                />
              </label>
              <button type="submit" className="primary-button">
                Place order
              </button>
            </div>

            <aside className="checkout-summary">
              <div className="summary-card">
                <h2>Order summary</h2>
                <div className="summary-row">
                  <span>Customer</span>
                  <strong>{user.name}</strong>
                </div>
                <div className="summary-row">
                  <span>Items</span>
                  <strong>{totalItems}</strong>
                </div>
                <div className="summary-row summary-total-row">
                  <span>Total</span>
                  <strong>Rs. {totalPrice}</strong>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <strong>Free</strong>
                </div>
              </div>
              <div className="checkout-items-card">
                <h3>Items</h3>
                <ul className="checkout-items-list">
                  {cartItems.map((item) => (
                    <li key={item._id} className="checkout-item-row">
                      <span>{item.qty}× {item.name}</span>
                      <strong>Rs. {item.qty * item.price}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </form>
        </div>
    </div>
  );
}

export default CheckoutScreen;
