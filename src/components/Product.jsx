import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";
import "../App.css";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    console.log("products :: ", products);
  }, [products]);
  return (
    <Container>
      <h1 className="my-4">Fake Store CRUD</h1>
      <Row>
        {products.map((product) => (
          <Col xs={6} sm={6} md={4} lg={3} className="mb-4" key={product.id}>
            <ProductCard
              product={product}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
 
export default Product;
