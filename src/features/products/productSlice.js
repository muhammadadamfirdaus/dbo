import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
  message: "",
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
};

// get products
export const getProducts = createAsyncThunk("products", async (_, thunkAPI) => {
  // console.log(thunkAPI);
  try {
    // const token = thunkAPI.getState().auth.user.data.user.user_jwt_token || thunkAPI.getState().auth.user.data.orang.user_jwt_token;
    // console.log(token);
    return await productService.getProducts();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    if (error.response.status === 401) {
      localStorage.setItem("user", JSON.stringify(error.response.data));
    }

    return thunkAPI.rejectWithValue(message);
  }
});

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = state.isSuccess === false ? true : false;
        state.isSuccess = action.payload.success;
        state.message = action.payload && action.payload.msg;
        state.products = action.payload.products;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload && action.payload.msg;
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
