import axios from "axios";

const BACKEND_URL = `http://localhost:5000`;
export const API_URL = `${BACKEND_URL}/api/brand/`;

// Get Brand
const getBrands = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
// Get Brand
const getBrand = async (id) => {
  const response = await axios.get(API_URL + `${id}`);
  return response.data;
};

// Create Brand
const createBrand = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

// Create Brand
const updateBrand = async (id, data) => {
  const response = await axios.patch(API_URL + `update-brand/${id}`, data);
  return response.data;
};

// Create Brand
const deleteBrand = async (id) => {
  const response = await axios.delete(API_URL + `delete-brand/${id}`);
  return response.data;
};

const brandService = {
  getBrands,
  createBrand,
  updateBrand,
  getBrand,
  deleteBrand,
};

export default brandService;
