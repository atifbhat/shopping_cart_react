import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/productActions';
import formatCurrency from '../util';

const Products = (props) => {
  const { products, addToCart, fetchProducts } = props;

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      {products && products.length === 0 ? (
        <div>No products found.</div>
      ) : (
        <ul className="products">
          {products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <a href={'#' + product._id}>
                  <img src={product.image} alt="product_image" />
                  <p>{product.title}</p>
                </a>
                <div className="product-price">
                  <div>{formatCurrency(product.price)}</div>
                  <button
                    onClick={() => addToCart(product)}
                    className="button primary"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.products.items,
});

const mapDispatchToProps = {
  fetchProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
