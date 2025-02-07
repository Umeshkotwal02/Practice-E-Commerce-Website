import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUser = async (userId) => {
    try {
<<<<<<< HEAD
      const user = JSON.parse(localStorage?.getItem('userData')?? '{}')
=======
      const user = JSON.parse(localStorage?.getItem('userData') ?? '{}')
>>>>>>> a79ef64 (update website)
      console.log('user :: ', user)
      const response = await axios.get(
        `https://fakestoreapi.com/users/${user?.id}`
      );
      console.log('response.data :: ', response.data, `https://fakestoreapi.com/users/${user?.id}`)
      setUserData(response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setError("Error fetching user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("userData"); // Retrieve the user ID
    if (userData) {
      fetchUser(userData); // Fetch user data using the ID
    } else {
      setLoading(false); // No user ID found
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!userData) {
    return <p>No user data found. Please sign up first.</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Street</th>
            <th>Street Number</th>
            <th>Zipcode</th>
          </tr>
        </thead>
        <tbody>
          <tr key={userData.id}>
            <td>{userData?.username}</td>
            <td>{`${userData?.name?.firstname} ${userData?.name?.lastname}`}</td>
            <td>{userData.email}</td>
            <td>{userData.phone}</td>
            <td>{userData.address.city}</td>
            <td>{userData.address.street}</td>
            <td>{userData.address.number}</td>
            <td>{userData.address.zipcode}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Profile;
