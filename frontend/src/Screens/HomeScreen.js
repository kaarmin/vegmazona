import React from 'react';
import { Link } from 'react-router-dom';
import data from '../data';

function HomeScreen(props) {
  const categorySlug = props.match?.params?.categorySlug || 'all-products';

  const createSlug = (category) =>
    category
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const slugToLabel = {
    'all-products': 'All products',
  };

  const activeCategory = slugToLabel[categorySlug] ||
    data.products
      .map((product) => product.Category)
      .find((category) => createSlug(category) === categorySlug);

  const filteredProducts = categorySlug === 'all-products'
    ? data.products
    : categorySlug && !activeCategory
      ? []
      : data.products.filter((product) => createSlug(product.Category) === categorySlug);

  const addToCart = (product) => {
    if (props.addToCart) {
      props.addToCart(product, 1);
    }
  };

  const uniqueCategories = Array.from(new Set(data.products.map((p) => p.Category)));

  return (
    <>
      <div className="category-header">
        <div>
          <h1>{activeCategory ? activeCategory : 'All products'}</h1>
          {activeCategory && <p>Showing products from the {activeCategory} category.</p>}
        </div>
        {activeCategory && (
          <Link className="secondary-button" to="/">
            View all products
          </Link>
        )}
      </div>

      {activeCategory ? (
        <ul className="products">
          {filteredProducts.length === 0 ? (
            <li className="empty-state">No products found in this category.</li>
          ) : (
            filteredProducts.map((product) => (
              <li key={product._id}>
                <div className="product">
                  <Link to={'/product/' + product._id}>
                    <img className="product-image" src={product.image} alt={product.name} />
                  </Link>
                  <div className="product-name">
                    <Link to={'/product/' + product._id}>{product.name}</Link>
                  </div>
                  <div className="product-category">{product.Category}</div>
                  <div className="product-brand">Brand: {product.brand}</div>
                  <div className="product-price">Rs.{product.price}</div>
                  <div className="product-rating">{product.rating} stars • {product.numReviews} reviews</div>
                  <button className="secondary-button" onClick={() => addToCart(product)}>
                    Add to cart
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      ) : (
        <div className="all-categories">
          {uniqueCategories.map((cat) => (
            <section className="category-section" key={cat}>
              <div className="category-title-wrap">
                <h2 className="category-title">{cat}</h2>
                <Link className="secondary-button" to={`/category/${createSlug(cat)}`}>
                  View category
                </Link>
              </div>
              <ul className="products small-grid">
                {data.products
                  .filter((p) => p.Category === cat)
                  .map((product) => (
                    <li key={product._id}>
                      <div className="product">
                        <Link to={'/product/' + product._id}>
                          <img className="product-image" src={product.image} alt={product.name} />
                        </Link>
                        <div className="product-content">
                          <div className="product-name">
                            <Link to={'/product/' + product._id}>{product.name}</Link>
                          </div>
                          <div className="product-price">Rs.{product.price}</div>
                          <button className="secondary-button" onClick={() => addToCart(product)}>
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </>
  );
}

export default HomeScreen;