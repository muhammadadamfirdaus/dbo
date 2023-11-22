import axios from "axios";

const urlDev = process.env.REACT_APP_API_URL_DEV;
const urlProd = process.env.REACT_APP_API_URL_PROD;

const API_URL = process.env.REACT_APP_ENV === "development" ? `${urlDev}` : `${urlProd}`;

// register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "auth/register", userData);
  console.log(response.data, userData);

  if (response.data) {
    const email = userData.email;
    const simpan = { ...response.data, email };
    localStorage.setItem("user", JSON.stringify(simpan));
  }

  return response.data;
};

// email verification
const emailVerification = async (verificationData) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user.email;
  const verificationDataRegister = { ...verificationData, email };
  console.log(verificationData, email);
  console.log(verificationDataRegister);
  const response = await axios.post(API_URL + "auth/email-verification", verificationDataRegister);

  if (response.data) {
    const simpan = { ...response.data, email };
    localStorage.setItem("user", JSON.stringify(simpan));
  }

  return response.data;
};

// login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "auth/login", userData);
  console.log(response.data);

  if (response.data) {
    const email = userData.email;
    const simpan = { ...response.data, email };
    localStorage.setItem("user", JSON.stringify(simpan));
  }

  return response.data;
};

// logout user
export const logout = async () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  emailVerification,
  login,
  logout,
};

export default authService;
