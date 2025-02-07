import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/counter/cartSlice";
import ProductCard from "./ProductCard";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate(); 
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.counter.items);
  const cartItem = cartItems.find((item) => item.id === parseInt(productId));
  const productQuantity = cartItem ? cartItem.quantity : 0;
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );
        setProduct(response.data);
        fetchRelatedProducts(response.data.category);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    const fetchRelatedProducts = async (category) => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const related = response.data.filter(
          (item) =>
            item.category === category && item.id !== parseInt(productId)
        );
        setRelatedProducts(related);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(add(product));
    }
  };

  const handleIncrement = () => {
    if (product) {
      dispatch(add(product)); // Add one more of the product
    }
  };

  const handleDecrement = () => {
    if (cartItem && cartItem.quantity > 0) {
      dispatch(remove(product.id)); // Remove one of the product
    }
  };

  const handleViewCart = () => {
    navigate("/cart"); // Redirect to the cart page
  };

  if (!product) return <p>Loading...</p>;
  return (
    <Container>
      <Card
        style={{ width: "100%", margin: "30px 0" }}
        className="shadow-lg rounded"
      >
        <Row>
          <Col md={6}>
            <Card.Img
              src={product.image}
              alt={product.title}
              className="pro-img p-4"
              style={{ maxHeight: "300px", objectFit: "contain" }}
            />
            <div className="productdetails-btn">
              {productQuantity > 0 ? (
                <div className="d-flex align-items-center justify-content-center cart-btns">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={handleDecrement}
                  >
                    -
                  </Button>
                  <span className="mx-2">{productQuantity}</span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={handleIncrement}
                  >
                    +
                  </Button>
                  <Button
                    variant="danger"
                    onClick={handleViewCart}
                    className="view-cart-btn ms-3 my-4 p-2"
                  >
                    View Cart
                  </Button>
                </div>
              ) : (
                <Button
                  variant="success"
                  className="d-block mx-auto my-4 p-2"
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </Button>
              )}
            </div>
          </Col>
          <Col md={6} className="main-product">
            <Card.Body>
              <Card.Title className="fw-bold">{product.title}</Card.Title>
              <Card.Text>
                <p>Category: {product.category}</p>
                <h4 className="text-success">₹{product.price}</h4>
                <p>{product.description}</p>
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      <h3 className="my-4">Related Products</h3>
{/* ------------------------------------Product Card Component------------------------------------------------ */}
      <Row>
        {relatedProducts.map((relatedProduct) => (
          <Col
            xs={6}
            sm={6}
            md={4}
            lg={3}
            className="mb-4"
            key={relatedProduct.id}
          >
            <ProductCard
              product={relatedProduct}
              onDelete={() => {
                setRelatedProducts((prev) =>
                  prev.filter((row) => row.id !== relatedProduct.id)
                );
              }}
              onUpdate={(updatedProduct) => {
                setProducts(
                  products.map((row) =>
                    row.id === updatedProduct.id ? updatedProduct : row
                  )
                );
              }}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductDetails;
