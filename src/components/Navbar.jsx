import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar as BootstrapNavbar, Badge } from "react-bootstrap"; // Renamed the Navbar to avoid conflicts
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "./Profile";

// Rename to NavApp to avoid naming conflicts with Bootstrap's Navbar
const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const cartItems = useSelector((state) => state.counter.items);

  // Calculate the total number of items in the cart
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Handle logout functionality
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); // Remove login status from localStorage
    window.location.href = "/login"; // Redirect to login
  };

  const handleProfile = () => {
    window.location.href = "/profile";
    <Profile />;
  };

  return (
    <header className="mb-auto">
      <BootstrapNavbar
        bg="dark"
        variant="dark"
        expand="lg"
        className="navbar navbar-expand-lg navbar-light bg-light"
      >
        <Container>
          <BootstrapNavbar.Brand as={Link} to="/home">
            Welcome to Shopping Site
          </BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/product">
                Product
              </Nav.Link>
              <Nav.Link as={Link} to="/men">Men</Nav.Link>
              <Nav.Link as={Link} to="/women">Women</Nav.Link>
              <Nav.Link as={Link} to="/electronics">Electronics</Nav.Link>
              <Nav.Link as={Link} to="/jewelery">Jewelery</Nav.Link>
              <Nav.Link as={Link} to="/beautyproducts">Beauty-Products</Nav.Link>
              <Nav.Link as={Link} to="/about">
                About Us
              </Nav.Link>
              <Nav.Link as={Link} to="/users">
                Users
              </Nav.Link>
              <Nav.Link as={Link} to="/cart">
                Cart
                <span className="material-symbols-outlined nav_cart">
                  shopping_cart
                  <span className="cart-count">
                    {totalItems > 0 && (
                      <Badge pill bg="danger" className="cart-badge">
                        {totalItems}
                      </Badge>
                    )}
                  </span>
                </span>
              </Nav.Link>
              <Nav.Link as={Link} to="/profile">
                <span className="material-symbols-outlined nav_cart_person">person</span>
              </Nav.Link>

              {!isLoggedIn ? (
                <Nav.Link as={Link} to="/login" className="nav_bar">
                  Login
                </Nav.Link>
              ) : (
                <div>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </div>
              )}
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </header>
  );
};

export default Navbar;
