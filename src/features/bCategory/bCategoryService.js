import axios from "axios";

const BACKEND_URL = `http://localhost:5000`;
export const API_URL = `${BACKEND_URL}/api/blogCategory/`;

// create  Blog Category
const createBlogCategory = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

// Get Blog Category
const getBlogCategory = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get A Blog Category
const getABlogCategory = async (id) => {
  const response = await axios.get(API_URL + `${id}`);
  return response.data;
};

// Update Blog Category
const updateBlogCategory = async (id, data) => {
  const response = await axios.patch(API_URL + `${id}`, data);
  return response.data;
};

// Delete Blog Category
const deleteBlogCategory = async (id) => {
  const response = await axios.delete(API_URL + `${id}`);
  return response.data;
};

const bCategoryService = {
  getBlogCategory,
  createBlogCategory,
  getABlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};

export default bCategoryService;
