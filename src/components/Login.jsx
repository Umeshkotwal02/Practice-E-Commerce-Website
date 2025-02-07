import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://fakestoreapi.com/users', {
        username: username,
        password: password,
      });
      
      // Simulate accessing a new ID and triggering a 404 error
      try {
        const newId = response.data.id; // Assuming response contains an ID (which it doesn't in reality)
        console.log(`Accessing new ID: ${newId}`);
        if (!newId) {
          throw new Error("404: The ID you are trying to access does not exist.");
        }
      } catch (error) {
        console.error("Error accessing ID: ", error.message);
        setError("You are trying to access a non-existent ID. This will result in a 404 error.");
      }

      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/about"); // Redirect to About or Home page after successful login
    } catch (error) {
      setError("Invalid username or password.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <h1>Login</h1>
          <p>Please fill in this form to login.</p>
          <hr />
          <label htmlFor="exampleInputUsername1">Username</label>
          <input
            type="text"
            id="exampleInputUsername1"
            placeholder="Enter Your Username"
            value={username}
            className="input"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="input"
            id="exampleInputPassword1"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" className="btn-primary m-2">Submit</button>
          <Link to="/sign"><p>Sign Up</p></Link>
          <Link to="/product"><p>Forgot Password?</p></Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
