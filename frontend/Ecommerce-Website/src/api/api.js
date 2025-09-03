import axios from "axios";

const api = axios.create({
  baseURL: "https://swiftcart-vkjs.onrender.com",
});

export default api;
