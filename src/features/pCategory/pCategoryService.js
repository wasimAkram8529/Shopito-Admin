import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/productCategory/`;
const getProductsCategory = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
const getProductCategory = async (id) => {
  const response = await axios.get(API_URL + `${id}`);
  return response.data;
};
const createProductsCategory = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

const updateProductsCategory = async (id, data) => {
  const response = await axios.patch(API_URL + `${id}`, data);
  return response.data;
};
const deleteProductsCategory = async (id) => {
  const response = await axios.delete(API_URL + `${id}`);
  return response.data;
};

const pCategoryService = {
  getProductsCategory,
  getProductCategory,
  createProductsCategory,
  updateProductsCategory,
  deleteProductsCategory,
};

export default pCategoryService;
