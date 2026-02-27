import axios from "axios";

// Create an Axios instance with base URL
const api = axios.create({
  // baseURL: "https://human-hire-backend.onrender.com/api/",
  baseURL: "https://human-hire-corp-updated.onrender.com/api/",  //When work in live
  // baseURL: "http://localhost:5000/api/",        //When Work on local
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
    //   if (window.location.pathname !== "/admin" && window.location.pathname !== "/") {
    //     window.location.href = "/admin";
    //   }
    }
    return Promise.reject(error);
  }
);
export default api;