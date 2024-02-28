import axios from "axios";

const BACKEND_URL = `http://localhost:5000`;
export const API_URL = `${BACKEND_URL}/api/color/`;

const getColor = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
const getAColor = async (id) => {
  const response = await axios.get(API_URL + `${id}`);
  return response.data;
};
const updateColor = async (id, data) => {
  const response = await axios.patch(API_URL + `${id}`, data);
  return response.data;
};
const deleteColor = async (id) => {
  const response = await axios.delete(API_URL + `${id}`);
  return response.data;
};

const createColor = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

const colorService = {
  getColor,
  createColor,
  getAColor,
  updateColor,
  deleteColor,
};

export default colorService;
