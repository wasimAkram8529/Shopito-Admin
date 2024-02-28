import axios from "axios";

const BACKEND_URL = `http://localhost:5000`;
export const API_URL = `${BACKEND_URL}/api/upload/`;
const uploadProductImg = async (data) => {
  const response = await axios.post(API_URL + "upload-productImg", data);
  return response.data;
};

const deleteProductImg = async (id) => {
  const response = await axios.delete(API_URL + `delete-Img/${id}`);
  return response.data;
};

const uploadService = {
  uploadProductImg,
  deleteProductImg,
};

export default uploadService;
