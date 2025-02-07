import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ProductCardTwo from './ProductCardTwo';

const Jewelery = () => {

  const [data, setData] = useState([])

  const getJeweleryProduct = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products/category/jewelery");
      setData(res.data)
    } catch (error) {
      console.error("getJeweleryProduct Error", error)
    }
  }
  useEffect(() => {
    getJeweleryProduct();
  }, []);

  return (
    <Container>
      <Row>
        {
          data.map((jewelery) => (
            <Col key={jewelery.id} xs={6} sm={6} md={4} lg={3} className="mb-4">
              <ProductCardTwo
                image={jewelery.image}
                title={jewelery.title}
                price={jewelery.price}
                category={jewelery.category}
                rating={jewelery?.rating?.rate}
                slug={jewelery.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")} // Generate slug

              >
              </ProductCardTwo>

            </Col>
          ))
        }
        <Col>
        </Col>
      </Row>
    </Container>
  );
}

export default Jewelery;
