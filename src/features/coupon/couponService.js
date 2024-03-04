import axios from "axios";

const BACKEND_URL = `http://localhost:5000`;
export const API_URL = `${BACKEND_URL}/api/coupon/`;

// Get Brand
const getCoupon = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
// Get Brand
const getACoupon = async (id) => {
  const response = await axios.get(API_URL + `${id}`);
  return response.data;
};
// update A Brand
const updateCoupon = async (id, data) => {
  const response = await axios.patch(API_URL + `${id}`, data);
  return response.data;
};
// Delete A Brand
const deleteCoupon = async (id) => {
  const response = await axios.delete(API_URL + `${id}`);
  return response.data;
};

// Create Brand
const createCoupon = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

const couponService = {
  getCoupon,
  createCoupon,
  getACoupon,
  updateCoupon,
  deleteCoupon,
};

export default couponService;
