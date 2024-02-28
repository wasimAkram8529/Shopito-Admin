import axios from "axios";

const BACKEND_URL = `http://localhost:5000`;
export const API_URL = `${BACKEND_URL}/api/products/`;
const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getAProduct = async (id) => {
  const response = await axios.get(API_URL + `${id}`);
  return response.data;
};
const createProduct = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};
const updateProduct = async (id, data) => {
  const response = await axios.post(API_URL + `${id}`, data);
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(API_URL + `${id}`);
  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  deleteProduct,
  getAProduct,
  updateProduct,
};

export default productService;
