import React from 'react';
import { Card } from 'react-bootstrap';
import { PiStarThin } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const ProductCardTwo = ({ image, title, price, category, rating, slug }) => {
    return (
        <div>
            <Link to={`/product/${slug}`} style={{ textDecoration: 'none' }}>
                <Card className="h-100 shadow-sm text-capitalize" style={{ cursor: "pointer" }}>
                    <Card.Img
                        variant="top"
                        src={image}
                        style={{ height: '200px', objectFit: 'contain' }}
                        className="card-img mt-3 img-fluid"
                    />
                    <Card.Body>
                        <Card.Title className="fw-bold text-truncate text-center fs-4 body">
                            {title}
                        </Card.Title>
                        <Card.Text className="fw-bold text-success">Price: ${price}</Card.Text>
                        <Card.Text className="text-muted">Category: {category}</Card.Text>
                        <Card.Text>
                            Rating:
                            <span className="bg-success border rounded text-white fw-bold p-1 ms-1">
                                {rating}
                                <PiStarThin className="fw-bold m-1" />
                            </span>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        </div>
    );
};

export default ProductCardTwo;
