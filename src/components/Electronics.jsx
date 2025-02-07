import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ProductCardTwo from './ProductCardTwo';
const Electronics = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getElectronics = async () => {
    setIsLoading(true); // Show spinner
    try {
      const res = await axios.get("https://fakestoreapi.com/products/category/electronics");
      setData(res.data);
    } catch (error) {
      console.error("getElectronic Error", error);
    } finally {
      setIsLoading(false); // Hide spinner
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getElectronics();
  }, []);


  return (
    <Container>
      <Row>
        {!isLoading &&
          data.map((electronic) => (
            <Col key={electronic.id} xs={6} sm={6} md={4} lg={3} className="mb-4">
              <ProductCardTwo
                image={electronic.image}
                title={electronic.title}
                price={electronic.price}
                category={electronic.category}
                rating={electronic?.rating?.rate}
                slug={electronic.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")} // Generate slug
              />
            </Col>
          ))
        }
      </Row>
    </Container>
  );
};

export default Electronics;
