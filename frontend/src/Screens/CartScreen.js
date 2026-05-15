import React from 'react';
import { Link } from 'react-router-dom';

function CartScreen({ cartItems, updateQty, removeFromCart }) {
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart-page">
      <div className="page-header">
        <h1>Your cart</h1>
        <p>{cartItems.length} product{cartItems.length === 1 ? '' : 's'} in cart</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link className="secondary-button" to="/">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <div className="cart-item-name">
                    <Link to={'/product/' + item._id}>{item.name}</Link>
                  </div>
                  <div className="cart-item-category">{item.Category}</div>
                  <div className="cart-item-brand">Brand: {item.brand}</div>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button onClick={() => updateQty(item._id, item.qty - 1)} disabled={item.qty <= 1}>
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item._id, item.qty + 1)}>＋</button>
                  </div>
                  <div className="cart-item-price">Rs. {item.price * item.qty}</div>
                  <button className="remove-button" onClick={() => removeFromCart(item._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <div className="summary-card">
              <h2>Order summary</h2>
              <div className="summary-row">
                <span>Items</span>
                <strong>{cartItems.reduce((sum, item) => sum + item.qty, 0)}</strong>
              </div>
              <div className="summary-row summary-total-row">
                <span>Total</span>
                <strong>Rs. {totalPrice}</strong>
              </div>
              <button className="primary-button summary-button">Proceed to checkout</button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

export default CartScreen;
