import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navapp from "./components/Navbar";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import About from "./components/About";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import UserList from "./components/UserList";
import Login from "./components/Login";
import SignUp from "./components/Sign";
import Profile from "./components/Profile";
import Women from "./components/Women";
import Men from "./components/Men";
import Electronics from "./components/Electronics";
import Jewelery from "./components/Jewelery";
import Beautyproducts from "./components/Beautyproducts";

function App() {
  // Initialize state from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // Update localStorage whenever the login status changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <Navapp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/product" /> : <Login setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route path="/sign" element={<SignUp />} />
        <Route path="/product" element={<Product />} />
        <Route
          path="/"
          element={isLoggedIn ? <Product /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route
          path="/about"
          element={isLoggedIn ? <About /> : <Navigate to="/login" />}
        />
        <Route
          path="/users"
          element={isLoggedIn ? <UserList /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={isLoggedIn ? <Cart /> : <Navigate to="/login" />}
        />
        <Route
          path="/women"
          element={isLoggedIn ? <Women /> : <Navigate to="/login" />}
        />
        <Route
          path="/men"
          element={isLoggedIn ? <Men /> : <Navigate to="/login" />}
        />
        <Route
          path="/electronics"
          element={isLoggedIn ? <Electronics /> : <Navigate to="/login" />}
        />
        <Route
          path="/jewelery"
          element={isLoggedIn ? <Jewelery /> : <Navigate to="/login" />}
        />
        <Route
          path="/beautyproducts"
          element={isLoggedIn ? <Beautyproducts /> : <Navigate to="/login" />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
