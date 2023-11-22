import axios from "axios";

const urlDev = process.env.REACT_APP_API_URL_DEV;
const urlProd = process.env.REACT_APP_API_URL_PROD;

const API_URL = process.env.REACT_APP_ENV === "development" ? `${urlDev}` : `${urlProd}`;

// update user profile
const updateProfile = async (profileData, token) => {
  // console.log(token);
  const config = {
    headers: {
      JWT: token,
    },
  };

  const response = await axios.post(API_URL + "profiles/update", profileData, config);

  return response.data;
};

const updateProfileService = {
  updateProfile,
};

export default updateProfileService;
