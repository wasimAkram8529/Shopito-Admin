import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/productCategory/`;
const getProductsCategory = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
const createProductsCategory = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

const pCategoryService = {
  getProductsCategory,
  createProductsCategory,
};

export default pCategoryService;
