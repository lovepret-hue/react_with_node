import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get('auth/dashboard');
        setMessage(res.data.message);
      } catch (err) {
        console.error(err);
        setError('Unauthorized. Please login again.');
        navigate('/login');
      }
    };

    fetchDashboard();
  }, [navigate]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Dashboard;
