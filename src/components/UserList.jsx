import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Table,
  ModalTitle,
} from "react-bootstrap";
import Swal from "sweetalert2";

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    street: "",
    city: "",
  });

  // Add User form data
  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    street: "",
    city: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await("https://fakestoreapi.com/users");
        
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();   
        console.log(data);
        
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Show modal for adding new user
  const addNewUser = () => {
<<<<<<< HEAD
    setSelectedUser(null); // Clear selected user
=======
    setSelectedUser(null);
>>>>>>> a79ef64 (update website)
    setShow(true);
  };

  // Close modal
  const handleClose = () => {
    setShow(false);
    setSelectedUser(null);
  };

  // Handle input changes for new user form
  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Add new user function
  const handleAddUser = async () => {
    try {
      const response = await axios.post("https://fakestoreapi.com/users", {
        email: newUser.email,
        username: newUser.firstname,
        password: "userpassword",
        name: {
          firstname: newUser.firstname,
          lastname: newUser.lastname,
        },
        address: {
          city: newUser.city,
          street: newUser.street,
          number: 0,
          zipcode: "00000",
          geolocation: {
            lat: "-37.3159",
            long: "81.1496",
          },
        },
        phone: newUser.phone,
      });
  
      const createdUser = {
        ...response.data,
        id: users.length + 1, // fallback for id if not provided
        name: {
          firstname: newUser.firstname,
          lastname: newUser.lastname,
        },
        address: {
          street: newUser.street,
          city: newUser.city,
        },
        email: newUser.email,
        phone: newUser.phone,
      };
  
      setUsers([...users, createdUser]);
      Swal.fire("Success", "User added successfully!", "success");
      handleClose();
    } catch (error) {
      console.error("Error adding new user:", error);
      Swal.fire("Error", "There was an error adding the user.", "error");
    }
  };
  

  // Edit Modal handlers
  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditFormData({
      firstname: user?.name?.firstname,
      lastname: user?.name?.lastname,
      email: user?.email,
      phone: user?.phone,
      street: user?.address?.street,
      city: user?.address?.city,
    });
    setShow(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      // updating user data
      await axios.put(`https://fakestoreapi.com/users/${selectedUser.id}`, {
        ...selectedUser,
        name: {
          firstname: editFormData.firstname,
          lastname: editFormData.lastname,
        },
        email: editFormData.email,
        phone: editFormData.phone,
        address: {
          street: editFormData.street,
          city: editFormData.city,
        },
      });

      // Update users list locally
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id
            ? {
                ...user,
                name: {
                  firstname: editFormData.firstname,
                  lastname: editFormData.lastname,
                },
                email: editFormData.email,
                phone: editFormData.phone,
                address: {
                  street: editFormData.street,
                  city: editFormData.city,
                },
              }
            : user
        )
      );

      Swal.fire("Success", "User details updated successfully!", "success");
      handleClose();
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire("Error", "There was an error updating the user.", "error");
    }
  };

  // Delete user handler
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Delete This User",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel please!",
      });

      if (result.isConfirmed) {
        await axios.delete(`https://fakestoreapi.com/users`);
        setUsers(users.filter((user) => user.id !== id));
        Swal.fire("Deleted!", "Your user has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire("Error", "There was an error deleting the user.", "error");
    }
  };

  return (
    <>
      <h2 className="mb-4 m-4">User List</h2>
      <Button
        variant="info"
        className="adduserbtn p-2 m-4"
        size="sm"
        onClick={addNewUser}
      >
        Add User
      </Button>

      {/* Add/Edit Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <ModalTitle>
            {selectedUser ? "Edit User" : "Add New User"}
          </ModalTitle>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                value={selectedUser ? editFormData.firstname : newUser.firstname}
                onChange={selectedUser ? handleInputChange : handleNewUserChange}
              />
            </Form.Group>
            <Form.Group controlId="formLastname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                value={selectedUser ? editFormData.lastname : newUser.lastname}
                onChange={selectedUser ? handleInputChange : handleNewUserChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={selectedUser ? editFormData.email : newUser.email}
                onChange={selectedUser ? handleInputChange : handleNewUserChange}
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={selectedUser ? editFormData.phone : newUser.phone}
                onChange={selectedUser ? handleInputChange : handleNewUserChange}
              />
            </Form.Group>
            <Form.Group controlId="formStreet">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={selectedUser ? editFormData.street : newUser.street}
                onChange={selectedUser ? handleInputChange : handleNewUserChange}
              />
            </Form.Group>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={selectedUser ? editFormData.city : newUser.city}
                onChange={selectedUser ? handleInputChange : handleNewUserChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={selectedUser ? handleSaveChanges : handleAddUser}
          >
            {selectedUser ? "Save Changes" : "Add User"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* User List */}
      <Table className="user-container my-5" striped bordered hover>
        <thead>
          <tr className="fw-bold py-2 bg-light text-center">
            <th>No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              className="border-bottom py-3 align-items-center text-center"
              key={user.id}
            >
              <td>{user?.id}</td>
              <td>{user?.name?.firstname}</td>
              <td>{user?.name?.lastname}</td>
              <td>{user?.email}</td>
              <td>{user?.phone}</td>
              <td>{user?.address?.street}, {user?.address?.city}
              </td>
              <td>
                <div className="d-flex align-items-center justify-content-center m-2 p-2">
                  <Button
                    variant="info"
                    size="sm"
                    className="m-2"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserList;