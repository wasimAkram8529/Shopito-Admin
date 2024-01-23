import axios from "axios";
//import { base_url } from "../../utils/base_url";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/user/`;
const getUsers = async () => {
  const response = await axios.get(API_URL + "all-users");
  //console.log(response.data);
  return response.data;
};

const customerService = {
  getUsers,
};

export default customerService;
