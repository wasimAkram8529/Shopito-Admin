import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/user/`;
const getOrders = async () => {
  const response = await axios.get(API_URL + "get-orders");
  return response.data;
};

const orderService = {
  getOrders,
};

export default orderService;
