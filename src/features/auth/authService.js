import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/user/`;

const login = async (userData) => {
  const response = await axios.post(API_URL + "admin-login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  //console.log(response.data);
  return response.data;
};

// Login Status
const getLoginStatus = async () => {
  const response = await axios.get(API_URL + "getLoginStatus");
  return response.data;
};

// Logout User
const logout = async () => {
  const response = await axios.get(API_URL + "logout");
  return response.data.message;
};

const getAUser = async () => {
  const response = await axios.get(API_URL + `get-user`);
  return response.data;
};

// Get All Orders
const getAllOrders = async () => {
  const response = await axios.get(API_URL + "get-all-orders");
  return response.data;
};
// Get A Product
const getAOrder = async (id) => {
  const response = await axios.get(API_URL + `order/${id}`);
  return response.data;
};
// Get Monthly Order Income Detail
const getMonthlyIncomeAndCount = async () => {
  const response = await axios.get(
    API_URL + `orders/getMonthlyOrderIncomeAndCount`
  );
  return response.data;
};
// Get Yearly Order Count And Income
const getYearlyOrderCountAndAmount = async () => {
  const response = await axios.get(API_URL + `orders/getYearlyOrderCount`);
  return response.data;
};

// Forgot Password Token
const forgotPasswordToken = async (userEmail) => {
  const response = await axios.patch(
    API_URL + `forgot-password-token`,
    userEmail
  );
  return response.data;
};
// Reset Password
const resetPassword = async (token, userData) => {
  const response = await axios.patch(
    API_URL + `reset-password/${token}`,
    userData
  );
  return response.data;
};

const authService = {
  login,
  getLoginStatus,
  getAOrder,
  getAllOrders,
  getMonthlyIncomeAndCount,
  getYearlyOrderCountAndAmount,
  forgotPasswordToken,
  resetPassword,
  logout,
  getAUser,
};

export default authService;
