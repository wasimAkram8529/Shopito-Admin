import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/enquiry/`;

const getEnquiries = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getAEnquiry = async (id) => {
  const response = await axios.get(API_URL + `${id}`);
  return response.data;
};
const updateEnquiry = async (id, data) => {
  const response = await axios.patch(API_URL + `${id}`, data);
  return response.data;
};

const deleteEnquiry = async (id) => {
  const response = await axios.delete(API_URL + `${id}`);
  return response.data;
};

const enquiryService = {
  getEnquiries,
  deleteEnquiry,
  getAEnquiry,
  updateEnquiry,
};

export default enquiryService;
