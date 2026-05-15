import React from 'react';
import data from '../data';

function Rating({ value }) {
  return <span className="rating">{value}★</span>;
}

function ProductScreen(props) {
  const productId = props.match.params.id;
  const product = data.products.find((item) => item._id === productId);

  const handleAddToCart = () => {
    if (props.addToCart) {
      props.addToCart(product, 1);
    }
  };

  if (!product) {
    return <div className="product-not-found">Product not found.</div>;
  }

  const reviews = product.reviews || [];

  return (
    <div className="product-details layout-left-image">
      <div className="details-info">
        <div>
          <h2>{product.name}</h2>
          <div className="details-category">{product.Category}</div>
          <div className="details-brand">Brand: {product.brand}</div>
          <div className="details-price">Rs. {product.price}</div>
          <div className="details-rating">
            <Rating value={product.rating} /> • {product.numReviews} reviews
          </div>
          <p className="details-description">{product.description}</p>
        </div>

        <div className="details-actions">
          <button className="primary-button" onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>

        <div className="reviews-section">
          <h3>Customer reviews</h3>
          {reviews.length === 0 ? (
            <div className="empty-state">No reviews yet.</div>
          ) : (
            <ul className="reviews-list">
              {reviews.map((r) => (
                <li key={r.id} className="review-item">
                  <div className="review-meta">
                    <strong className="review-author">{r.name}</strong>
                    <span className="review-date">{r.date}</span>
                    <span className="review-rating"><Rating value={r.rating} /></span>
                  </div>
                  <div className="review-comment">{r.comment}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="details-image">
        <img src={product.image} alt={product.name} />
      </div>
    </div>
  );
}

export default ProductScreen;