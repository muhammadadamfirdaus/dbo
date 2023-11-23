import axios from "axios";

const urlDev = process.env.REACT_APP_API_URL_DEV;
const urlProd = process.env.REACT_APP_API_URL_PROD;

const API_URL = process.env.REACT_APP_ENV === "development" ? `${urlDev}` : `${urlProd}`;

// get customers
const getCustomers = async (token) => {
  // console.log(token);
  const config = {
    headers: {
      JWT: token,
    },
  };

  const response = await axios.get(API_URL + "users", config);

  return response.data;
};

// get single customer
const getCustomerDetail = async (id, token) => {
  console.log(id, token);
  const config = {
    headers: {
      JWT: token,
    },
  };

  const response = await axios.get(API_URL + "users/" + id, config);
  console.log(response);

  return response.data;
};

const customerService = {
  getCustomers,
  getCustomerDetail,
};

export default customerService;
