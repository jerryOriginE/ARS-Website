const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://tech4goodAPI.balamserver.top'
    : 'http://localhost:5000';

export default API_BASE_URL;
