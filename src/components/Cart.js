import React, { useState } from 'react';
import formatCurrency from '../util';
import { connect } from 'react-redux';
import { removeFromCart } from '../actions/cartActions';
import { createOrder, clearOrder } from '../actions/orderActions';

import { Modal, Button } from 'react-bootstrap';

const Cart = (props) => {
  const [checkout, setCheckout] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const { cartItems, order, removeFromCart, createOrder } = props;
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  if (!Array.isArray(cartItems)) {
    return <div>Loading cart items...</div>;
  }

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'name') {
      setName(value);
    } else if (name === 'address') {
      setAddress(value);
    }
  };

  const submitOrder = (e) => {
    e.preventDefault();
    const order = {
      name,
      email,
      address,
      cartItems,
      total: cartItems.reduce((a, c) => a + c.price * c.count, 0),
    };
    props.createOrder(order);
    handleShow();
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="cart cart-header">Cart is empty</div>
      ) : (
        <div className="cart cart-header">
          You have {cartItems.length} item(s) in the cart
        </div>
      )}

      {order && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Order Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="order-details">
              <h3 className="success-message">
                Your order has been placed successfully
              </h3>
              <h2>Order ID: {order._id}</h2>
              <ul>
                <li>
                  <div>Name:</div>
                  <div>{order.name}</div>
                </li>
                <li>
                  <div>Email:</div>
                  <div>{order.email}</div>
                </li>
                <li>
                  <div>Address:</div>
                  <div>{order.address}</div>
                </li>
                <li>
                  <div>Total:</div>
                  <div>{formatCurrency(order.total)}</div>
                </li>
                <li>
                  <div>Cart Items:</div>
                  <div>
                    {order.cartItems.map((x) => (
                      <div key={x._id}>
                        {x.count} x {x.title}
                      </div>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <div className="cart">
        <ul className="cart-items">
          {cartItems.map((item) => (
            <li key={item._id}>
              <div>
                <img src={item.image} alt={item.title} />
              </div>

              <div>{item.title}</div>

              <div className="right">
                {formatCurrency(item.price)} * {item.count}{' '}
                <button
                  className="button"
                  onClick={() => removeFromCart(item)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {cartItems.length !== 0 && (
        <div>
          <div className="cart">
            <div className="total">
              <div>
                Total:{' '}
                {formatCurrency(
                  cartItems.reduce((a, c) => a + c.price * c.count, 0)
                )}
              </div>
              <button
                className="button primary"
                onClick={() => setCheckout(true)}
              >
                Proceed
              </button>
            </div>
          </div>

          {checkout && (
            <div className="cart">
              <form onSubmit={submitOrder}>
                <ul className="form-container">
                  <li>
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      onChange={handleInput}
                    />
                  </li>
                  <li>
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      onChange={handleInput}
                    />
                  </li>
                  <li>
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      onChange={handleInput}
                    />
                  </li>
                  <li>
                    <button className="button primary" type="submit">
                      Place Order
                    </button>
                  </li>
                </ul>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  order: state.order.order,
});

const mapDispatchToProps = {
  removeFromCart,
  createOrder,
  clearOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
