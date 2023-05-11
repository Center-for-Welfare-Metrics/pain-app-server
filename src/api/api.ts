import axios from "axios";

const api = axios.create({
  baseURL: process.env.CALCULUS,
});

export default api;
