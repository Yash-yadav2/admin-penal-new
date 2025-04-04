import axios from 'axios';

axios.defaults.baseURL = 'https://backend-new-u421.onrender.com:5000/api';  // Backend API URL
axios.defaults.withCredentials = true;  // Enable cookies & sessions

export default axios;
