import React from 'react';
import { Link } from 'react-router-dom';

function OrderConfirmationScreen({ location, user }) {
  const orderDetails = location?.state?.orderDetails;
  const orderNumber = orderDetails?.orderNumber || Math.floor(100000 + Math.random() * 900000);
  const customerName = orderDetails?.customerName || user?.name || 'Customer';

  return (
    <div className="checkout-page">
      <div className="page-header">
        <h1>Thank you for your order</h1>
        <p>Your order has been confirmed.</p>
      </div>
      <div className="order-confirmation">
        <h2>Order #{orderNumber} confirmed</h2>
        <p>Hi {customerName}, we have received your order.</p>
        {orderDetails ? (
          <div className="order-summary-card">
            <div className="summary-row">
              <span>Items ordered</span>
              <strong>{orderDetails.totalItems}</strong>
            </div>
            <div className="summary-row">
              <span>Order total</span>
              <strong>Rs. {orderDetails.totalPrice}</strong>
            </div>
            <div className="summary-row">
              <span>Shipping address</span>
              <strong>{orderDetails.shippingAddress}, {orderDetails.city}, {orderDetails.postalCode}, {orderDetails.country}</strong>
            </div>
          </div>
        ) : (
          <div className="order-summary-card">
            <p>We are preparing your order details. Please continue shopping for more items.</p>
          </div>
        )}
        <Link className="primary-button" to="/">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmationScreen;
