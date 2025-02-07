import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../redux/counter/cartSlice";

const ProductCard = ({ product = {} }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart?.items || []);
  const [addedToCart, setAddedToCart] = useState(
    cartItems.some((item) => item.id === product.id)
  );

  const addToCart = () => {
    dispatch(add(product));
    setAddedToCart(true);
  };

  const onViewToCart = () => {
    navigate("/cart");
  };

  return (
    <>
      <Card className="custom-card">
        <Link to={`/product/${product.id}`}>
          <Card.Img
            variant="top"
            src={product.image}
            alt={product.title}
            className="fixed-image p-3"
          />
        </Link>
        <Card.Body className="card_body">
          <Card.Title className="text-truncate text-center fs-4 body">
            {product.title}
          </Card.Title>
          <div className="single-line">
            <Card.Text>
              <b>₹{product.price}</b>
            </Card.Text>
            <Card.Text>
              <b>{product.category}</b>
            </Card.Text>
          </div>
          <div className="btn">
            {addedToCart > 0 ? (
              <div className="d-flex align-items-center justify-content-center cart-btns">
                <Button variant="info" onClick={onViewToCart}>
                  <span className="material-symbols-outlined">
                    shopping_cart_checkout
                  </span>
                  View Cart
                </Button>
              </div>
            ) : (
              <Button variant="info" onClick={addToCart}>
                <span className="material-symbols-outlined">shopping_cart</span>{" "}
                Add To Cart
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
