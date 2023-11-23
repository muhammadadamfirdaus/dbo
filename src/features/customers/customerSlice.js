import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerService from "./customerService";

const initialState = {
  message: "",
  customers: [],
  customer: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
};

// get customers
export const getCustomers = createAsyncThunk("customers", async (_, thunkAPI) => {
  // console.log(thunkAPI);
  try {
    // const token = thunkAPI.getState().auth.user.data.user.user_jwt_token || thunkAPI.getState().auth.user.data.orang.user_jwt_token;
    // console.log(token);
    return await customerService.getCustomers();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    if (error.response.status === 401) {
      localStorage.setItem("user", JSON.stringify(error.response.data));
    }

    return thunkAPI.rejectWithValue(message);
  }
});

// get list customer
export const getCustomerDetail = createAsyncThunk("customers/detail", async (id, thunkAPI) => {
  console.log(id);
  try {
    // const token = thunkAPI.getState().auth.user.data.user.user_jwt_token || thunkAPI.getState().auth.user.data.orang.user_jwt_token;
    // console.log(token);
    return await customerService.getCustomerDetail(id);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    if (error.response.status === 401) {
      localStorage.setItem("user", JSON.stringify(error.response.data));
    }

    return thunkAPI.rejectWithValue(message);
  }
});

export const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = state.isSuccess === false ? true : false;
        state.isSuccess = action.payload.success;
        state.message = action.payload && action.payload.msg;
        state.customers = action.payload.users;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload && action.payload.msg;
      })
      .addCase(getCustomerDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomerDetail.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.isError = state.isSuccess === false ? true : false;
        state.isSuccess = action.payload.success;
        state.message = action.payload && action.payload.msg;
        state.customer = action.payload;
      })
      .addCase(getCustomerDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload && action.payload.msg;
      });
  },
});

export const { reset } = customerSlice.actions;
export default customerSlice.reducer;
