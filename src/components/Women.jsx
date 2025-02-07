import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCardTwo from './ProductCardTwo';


const Women = () => {

  const [data, setData] = useState([]);

  const getWomenProduct = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products/category/women's%20clothing");
      setData(res.data)
      console.log("getWomenProduct :: ", res);
    } catch (error) {
      console.error("getWomenProduct :: ", error);
    }
  }

  useEffect(() => {
    getWomenProduct();
  }, []);

  return (
    <Container>
      <Row>
        {
          data.map((women) => (
            <Col key={women.id} xs={6} sm={6} md={4} lg={3} className="mb-4">
              <ProductCardTwo
                image={women.image}
                title={women.title}
                price={women.price}
                category={women.category}
                rating={women?.rating?.rate}
                slug={women.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")} // Generate slug

              />
            </Col>
          ))
        }
      </Row>
    </Container>
  );
}

export default Women;