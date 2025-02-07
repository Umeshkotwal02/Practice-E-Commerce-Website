import axios from 'axios';
import { useEffect } from 'react';
import { React, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import ProductCardTwo from './ProductCardTwo';

const Beautyproducts = () => {
  const [data, setData] = useState([]);

  const getproducts = async () => {
    try {
      const res = await axios.get('https://dummyjson.com/products');
      setData(res.data.products);
      console.log(res);
    } catch (error) {
      console.error("got error beauty-product::", error);
    }
  }

  useEffect(() => {
    getproducts()
  }, []);

  return (
    <>
      <Container>
        <Row>
          {
            data.map((product) => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                {/* xs={12} sm={6} md={4} lg={3} */}
                <ProductCardTwo
                  image={product.images[0]}
                  title={product.title}
                  price={product.price}
                  category={product.category}
                  rating={product.rating}
                  slug={product.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")} // Generate slug

                />
              </Col>
            ))
          }
        </Row>
      </Container>
    </>
  );
}

export default Beautyproducts;