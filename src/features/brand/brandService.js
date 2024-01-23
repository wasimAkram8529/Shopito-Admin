import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/brand/`;

// Get Brand
const getBrands = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create Brand
const createBrand = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

const brandService = {
  getBrands,
  createBrand,
};

export default brandService;
