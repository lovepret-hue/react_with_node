import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import loginImage from '../assets/login-image.jpg'; // Your image path

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [captchaToken, setCaptchaToken] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!captchaToken) {
      setError('Please complete the CAPTCHA');
      return;
    }

    try {
      const res = await API.post('/auth/login', {
        ...formData,
        captcha: captchaToken,
      });

      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container fluid className="flex-grow-1 px-0">
      <Row className="g-0 h-100" style={{ minHeight: '100%' }}>
        {/* Left image section */}
        <Col md={7} className="d-none d-md-block">
          <div
            className="w-100 h-100"
            style={{
              backgroundImage: `url(${loginImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100%',
            }}
          />
        </Col>

        {/* Right login form section */}
 <Col
  md={5}
  className="d-flex align-items-center justify-content-center text-white"
  style={{
    background: 'linear-gradient(135deg, #001f3f, #006666, #00cccc)',
    height: '100%',
  }}
>

          <Card className="p-4 shadow" style={{ width: '80%', maxWidth: 400 }}>
            <h3 className="text-center mb-4">Login</h3>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <div className="d-flex justify-content-center mb-3">
                <ReCAPTCHA
                  sitekey="6LcoyIwrAAAAAEymN6XO6z5DvSns_mjZNHhZKw0Q"
                  onChange={handleCaptchaChange}
                />
              </div>

              <Button type="submit" variant="primary" className="w-100">
                Login
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
