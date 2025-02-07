import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import ProductCardTwo from './ProductCardTwo';

const Men = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  const getMenCloths = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products/category/men's%20clothing");
      setData(res.data);
      setLoading(false);
      console.log("getMenCloths Data :: ", res);
    } catch (error) {
      console.error("getMenCloths :: ", error);
    }
  }


  useEffect(() => {
    getMenCloths()
  }, [])

  
  if (loading) {
    return <Spinner animation="grow" />;
  }

  return (
    <Container>
      <Row>
        {
          data.map((men) => (
            <Col key={men.id} xs={6} sm={6} md={4} lg={3} className="mb-4">
              <ProductCardTwo
                image={men.image}
                title={men.title}
                price={men.price}
                category={men.category}
                rating={men?.rating?.rate}
                slug={men.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")} // Generate slug
              />
            </Col>
          ))
        }
      </Row>
    </Container>
  );
}

export default Men;
