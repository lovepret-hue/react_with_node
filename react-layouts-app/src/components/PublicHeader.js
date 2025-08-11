import React from 'react';
import { Container, Navbar, Button, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // 👈 Profile icon

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
        <Navbar.Brand as={Link} to="/" className="fw-bold text-white" style={{ cursor: 'pointer' }}>
          {title}
        </Navbar.Brand>

        <Nav className="ms-auto d-flex align-items-center">
          {isLoggedIn && (
            <>
              <Link to="/dashboard" className="nav-link text-white me-3">
                Dashboard
              </Link>

              <Link to="/profile" className="nav-link text-white me-3" title="Profile">
                <FaUserCircle size={24} />
              </Link>

              <Button variant="outline-light" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
