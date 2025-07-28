import React from 'react';
import { Container, Navbar, Button, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function PublicHeader({ title = "Lovepreet Singh" }) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token'); // Check login status

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully!');
    navigate('/login');
  };

  return (
    <Navbar style={{ backgroundColor: '#563d7c' }} variant="dark" expand="lg" className="shadow-sm">
      <Container className="d-flex justify-content-between align-items-center">
        {/* Title linked to home */}
        <Navbar.Brand as={Link} to="/" className="fw-bold text-white" style={{ cursor: 'pointer' }}>
          {title}
        </Navbar.Brand>

        <Nav className="ms-auto d-flex align-items-center">
          {isLoggedIn && (
            <Link to="/dashboard" className="nav-link text-white me-2">
              Dashboard
            </Link>
          )}
          {isLoggedIn && (
            <Button variant="outline-light" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
