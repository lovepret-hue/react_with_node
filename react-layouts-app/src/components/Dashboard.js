const getDashboard = async () => {
  try {
    const res = await API.get('/dashboard');
    console.log(res.data); // protected data
  } catch (err) {
    console.error('Access denied ❌', err.response?.data?.message);
  }
};
