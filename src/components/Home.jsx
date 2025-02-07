import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [setProducts] = useState([]);
  const categories = [
    "ELECTRONICS",
    "JEWELERY",
    "MEN'S CLOTHING",
    "WOMEN'S CLOTHING",
  ];

  const handleExploreCategory = async (category) => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  };

  return (
    <>
      <div className="hero bg-light text-center p-5">
        <h1>Welcome to Our Store</h1>
        <p>Discover the best deals on your favorite products</p>
        {/* Link to the product page */}
      </div>
        <Link to="/product" className="shop-btn">
          <button className="btn btn-primary">Shop Now</button>
        </Link>
      <div className="container my-5">
        <h3 className="mb-4">Shop by Categories</h3>
        <div className="row">
          {categories.map((category, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <h5 className="card-title">{category}</h5>
              <Link to="/product">
                <button
                  className="btn btn-primary"
                  onClick={() => handleExploreCategory(category)}
                >
                  Explore
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;