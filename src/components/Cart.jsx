import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/counter/cartSlice";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../App.css"; // Add custom CSS for styling

export default function Cart() {
  const cartItems = useSelector((state) => state.counter.items); // Get items from Redux state
  const dispatch = useDispatch();

  // Calculate the total price of all cart items
  const calculateTotalPrice = () => {
    return cartItems
      .reduce(
        (total, item) => total + (item.quantity || 0) * (item.price || 0),
        0
      )
      .toFixed(2);
  };

  return (
    <Container className="cart-container my-5">
      <h2 className="text-center mb-4">Your Shopping Cart</h2>

      {cartItems.length > 0 ? (
        <>
          {/* Header Row */}
          <Row className="cart-header fw-bold py-2 bg-light">
            <Col md={2} className="text-center">Product</Col>
            <Col md={4} className="text-center">Title</Col>
            <Col md={2} className="text-center">Price</Col>
            <Col md={2} className="text-center">Quantity</Col>
            <Col md={2} className="text-center">Total</Col>
          </Row>

          {/* Cart Items */}
          {cartItems.map((item) => (
            <Row
              className="cart-item-container border-bottom py-3 align-items-center"
              key={item.id}
            >
              <Col md={2} className="text-center">
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-img img-fluid"
                    style={{ maxHeight: "80px", objectFit: "contain" }} // Ensure image fits well
                  />
                </Link>
              </Col>
              <Col md={4}>
                <h5 className="cart-title mb-1">{item.title}</h5>
                <p className="text-muted">Rating: {item.rating?.rate || 0} ★</p>
              </Col>
              <Col md={2} className="item-price text-center">
                ₹{(item.price || 0).toFixed(2)}
              </Col>
              <Col md={2} className="item-quantity text-center qt-btn">
                <div className="d-flex align-items-center justify-content-center">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="rounded-pill"
                    onClick={() => dispatch(remove(item.id))}
                  >
                    -
                  </Button>
                  <span className="mx-3">{item.quantity}</span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="rounded-pill"
                    onClick={() => dispatch(add(item))}
                  >
                    +
                  </Button>
                </div>
              </Col>
              <Col md={2} className="item-total text-center fw-bold">
                ₹{((item.quantity || 0) * (item.price || 0)).toFixed(2)}
              </Col>
            </Row>
          ))}

          {/* Total Price and Checkout Button */}
          <Row className="mt-4 justify-content-end">
            <Col md={6} className="text-end">
              <h4 className="fw-bold">Total Price: ₹{calculateTotalPrice()}</h4>
              <Button
                variant="success"
                className="mt-3 w-50 rounded-pill"
                size="lg"
              >
                Proceed to Checkout
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <p className="text-center">Your cart is empty.</p>
      )}
    </Container>
  );
}
