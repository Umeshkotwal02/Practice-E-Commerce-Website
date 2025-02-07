import axios from "axios";
import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    name: {
      firstname: "",
      lastname: "",
    },
    address: {
      city: "",
      street: "",
      number: "",
      zipcode: "",
      geolocation: {
        lat: "",
        long: "",
      },
    },
    phone: "",
    remember: true,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes(".")) {
      const [field, subField] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [field]: {
          ...prevData[field],
          [subField]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation checks
    if (formData.password !== formData.repeatPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Invalid email format");
      return;
    }

    const userData = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      name: {
        firstname: formData.name.firstname,
        lastname: formData.name.lastname,
      },
      address: {
        city: formData.address.city,
        street: formData.address.street,
        number: parseInt(formData.address.number, 10) || 0,
        zipcode: formData.address.zipcode,
        geolocation: {
          lat: formData.address.geolocation.lat,
          long: formData.address.geolocation.long,
        },
      },
      phone: formData.phone,
    };
    console.log('this is',userData);
    

    try {
      const response = await axios.post(
        "https://fakestoreapi.com/users",
        userData
      );
      console.log("User signed up:", response.data);
      localStorage.setItem("userData", JSON.stringify({...userData, ...response?.data}));
      // localStorage.setItem("userId", response.data.id);

      setError("");
      setFormData({
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
        name: { firstname: "", lastname: "" },
        address: {
          city: "",
          street: "",
          number: "",
          zipcode: "",
          geolocation: { lat: "", long: "" },
        },
        phone: "",
        remember: true,
      });
      navigate("/login");
    } catch (error) {
      console.error("Error during signup:", error);
      setError("Failed to sign up");
    }
  };

  const handleCancel = () => {
    // Reset form or navigate to another page
    navigate("/home"); // Example: Redirect to home page
  };

  return (
    <form onSubmit={handleSubmit} className="sign-up-form">
      <div className="container">
        <h1>Sign Up</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />
        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="input"
          required
        />

        <label htmlFor="username">
          <b>Username</b>
        </label>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="input"
          required
        />

        {/* Name Section */}
        <label htmlFor="firstname">
          <b>First Name</b>
        </label>
        <input
          type="text"
          placeholder="Enter First Name"
          name="name.firstname"
          value={formData.name.firstname}
          onChange={handleChange}
          className="input"
          required
        />

        <label htmlFor="lastname">
          <b>Last Name</b>
        </label>
        <input
          type="text"
          placeholder="Enter Last Name"
          name="name.lastname"
          value={formData.name.lastname}
          onChange={handleChange}
          className="input"
          required
        />

        {/* Address Section */}
        <label htmlFor="city">
          <b>City</b>
        </label>
        <input
          type="text"
          placeholder="Enter City"
          name="address.city"
          value={formData.address.city}
          onChange={handleChange}
          className="input"
          required
        />

        <label htmlFor="street">
          <b>Street</b>
        </label>
        <input
          type="text"
          placeholder="Enter Street"
          name="address.street"
          value={formData.address.street}
          onChange={handleChange}
          className="input"
          required
        />

        <label htmlFor="number">
          <b>Street Number</b>
        </label>
        <input
          type="text"
          placeholder="Enter Number"
          name="address.number"
          value={formData.address.number}
          onChange={handleChange}
          className="input"
          required
        />

        <label htmlFor="zipcode">
          <b>Zipcode</b>
        </label>
        <input
          type="text"
          placeholder="Enter Zipcode"
          name="address.zipcode"
          value={formData.address.zipcode}
          onChange={handleChange}
          className="input"
          required
        />

        {/* Phone */}
        <label htmlFor="phone">
          <b>Phone Number</b>
        </label>
        <input
          type="tel"
          placeholder="Enter Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="input"
          required
        />

        {/* Password Section */}
        <label htmlFor="password">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="input"
          required
        />

        <label htmlFor="repeatPassword">
          <b>Repeat Password</b>
        </label>
        <input
          type="password"
          placeholder="Repeat Password"
          name="repeatPassword"
          value={formData.repeatPassword}
          onChange={handleChange}
          className="input"
          required
        />

        {/* Remember Checkbox */}
        <label>
          <input
            type="checkbox"
            name="remember"
            checked={formData.remember}
            onChange={handleChange}
            style={{ marginBottom: "15px" }}
          />
          Remember me
        </label>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="clearfix">
          <button type="button" className="cancelbtn" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="signupbtn">
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
};
export default SignUp;  