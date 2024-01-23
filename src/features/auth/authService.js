import axios from "axios";
// import { base_url } from "../../utils/base_url";

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
const authService = {
  login,
  getLoginStatus,
};

export default authService;
