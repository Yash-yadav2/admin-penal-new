import axios from 'axios';

axios.defaults.baseURL = 'https://xn--casiom820-jy5d.com:5000/api';  // Backend API URL
axios.defaults.withCredentials = true;  // Enable cookies & sessions

export default axios;
