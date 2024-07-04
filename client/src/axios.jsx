import axios from 'axios'

const axiosBase = axios.create({
  // baseURL: "http://localhost:5500/api"
  baseURL: "https://evangadi-forum-2-kolo.onrender.com/api",
});

export default axiosBase