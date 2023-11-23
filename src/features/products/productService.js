import axios from "axios";

const urlDev = process.env.REACT_APP_API_URL_DEV;
const urlProd = process.env.REACT_APP_API_URL_PROD;

const API_URL = process.env.REACT_APP_ENV === "development" ? `${urlDev}` : `${urlProd}`;

// get products
const getProducts = async (token) => {
  // console.log(token);
  const config = {
    headers: {
      JWT: token,
    },
  };

  const response = await axios.get(API_URL + "products", config);

  return response.data;
};

const productService = {
  getProducts,
};

export default productService;
