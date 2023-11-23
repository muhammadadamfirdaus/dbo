import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import profileUpdateReducer from "../features/profile/updateProfileSlice";
import productReducer from "../features/products/productSlice";
import customerReducer from "../features/customers/customerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    profileUpdate: profileUpdateReducer,
    product: productReducer,
    customer: customerReducer,
  },
});
