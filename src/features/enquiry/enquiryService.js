import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/enquiry/`;
const getEnquiries = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const enquiryService = {
  getEnquiries,
};

export default enquiryService;
