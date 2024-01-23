import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/`;

// Get Blog Category
const getBlogCategory = async () => {
  const response = await axios.get(API_URL + "blogCategory");
  return response.data;
};

// Get Blogs
const getBlogs = async () => {
  const response = await axios.get(API_URL + "blogs");
  return response.data;
};

const blogService = {
  getBlogCategory,
  getBlogs,
};

export default blogService;
