
import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const loginUser = async (data) => {
  return await axios.post(`${API}/login`, data);
};

export const registerUser = async (data) => {
  return await axios.post(`${API}/register`, data);
};