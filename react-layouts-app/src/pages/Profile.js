import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [image, setImage] = useState('');
  const [formData, setFormData] = useState({
  fullName: '',
  gender: '',
  email: '',
});
    const [error, setError] = useState('');
      const navigate = useNavigate();

      // load existing data
      useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await API.get('/auth/profile'); // Your GET endpoint
      setFormData({
        fullName: res.data.username || '',
        gender: res.data.gender || '',
        email: res.data.email || '',
       
      });
        setImage(res.data.image);
      console.log(res);
    } catch (err) {
      setError('Failed to load profile');
    }
  };

  fetchProfile();
}, [])
      // load existing data




  const handleChange = (e) => {
  const { name, value, files } = e.target;

   if (name === 'image') {
    const file = files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    // 👇 create a preview URL from selected file
    setImage(URL.createObjectURL(file));
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
};

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const form = new FormData();
    form.append('fullName', formData.fullName);
    form.append('gender', formData.gender);
    if (formData.image) {
      form.append('image', formData.image);
    }

    try {
      console.log(form);
      await API.put('/auth/profile-update', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Profile not updated');
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow">
            <Card.Body>
              <h4 className="mb-4">Update Profile</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Full Name</Form.Label>
                 <Form.Control
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={formData.email} readOnly />
                </Form.Group>

                 <Form.Group className="mb-3" controlId="formImage">
                  <Form.Label>Profile Image</Form.Label>
                  <Form.Control type="file" name="image" onChange={handleChange} accept="image/*" />
                </Form.Group>
                            {image && (
                  <div className="mb-3">
                    <img
                      src={`http://localhost:3001${image}`}
                      alt="Profile"
                      style={{ width: '120px', borderRadius: '50%' }}
                    />
                  </div>
                )}


                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
