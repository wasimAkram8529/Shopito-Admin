import axios from "axios";

const BACKEND_URL = `http://localhost:5000`;
export const API_URL = `${BACKEND_URL}/api/blogs/`;

// Get Blogs
const getBlogs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get A Blogs
const getABlog = async (id) => {
  const response = await axios.get(API_URL + `${id}`);
  return response.data;
};

// Update A Blogs
const updateBlog = async (id, data) => {
  const response = await axios.patch(API_URL + `${id}`, data);
  return response.data;
};
// Delete A Blog
const deleteBlog = async (id) => {
  const response = await axios.delete(API_URL + `${id}`);
  return response.data;
};

// Create Blogs
const createBlog = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

const blogService = {
  getBlogs,
  createBlog,
  getABlog,
  updateBlog,
  deleteBlog,
};

export default blogService;
