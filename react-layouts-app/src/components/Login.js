import API from '../services/api';

const loginUser = async (email, password) => {
  try {
    const res = await API.post('/auth/login', { email, password });
    const { token } = res.data;

    // Save token to localStorage
    localStorage.setItem('token', token);

    console.log('Login successful ✅');
  } catch (err) {
    console.error('Login failed ❌', err.response?.data?.message || err.message);
  }
};
