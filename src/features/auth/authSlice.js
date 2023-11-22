import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// get user
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  message: "",
  // user: user ? user : null,
  isError: user && user.success ? false : true,
  isSuccess: user && user.success ? true : false,
  isLoading: false,
  isRegisterSuccess: user && user.success ? true : false,
  isEmailVerificationSuccess: user && user.success ? true : false,
};

// register user
export const register = createAsyncThunk("auth/register", async (user, thunkAPI) => {
  // console.log(user);
  try {
    return await authService.register(user);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message); // return axios error to message state
  }
});

// email verification
export const emailVerification = createAsyncThunk("auth/email-verification", async (codeVerification, thunkAPI) => {
  console.log(codeVerification);
  try {
    const userEmail = thunkAPI.getState().auth.user.email;
    // console.log(userEmail);
    return await authService.emailVerification(codeVerification, userEmail);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message); // return axios error to message state
  }
});

// login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  // console.log(user, thunkAPI);
  try {
    return await authService.login(user);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message); // return axios error to message state
  }
});

// logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  return await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log(state, action);
        state.isLoading = false;
        state.isError = state.isSuccess === false ? true : false;
        state.isSuccess = action.payload.success;
        state.message = action.payload.msg;
        state.user = action.payload;
        state.isRegisterSuccess = action.payload.success;
      })
      .addCase(register.rejected, (state, action) => {
        console.log(state, action);
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.msg;
        state.user = action.payload;
      })
      .addCase(emailVerification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(emailVerification.fulfilled, (state, action) => {
        console.log(state, action);
        state.isLoading = false;
        state.isError = state.isSuccess === false ? true : false;
        state.isSuccess = action.payload.success;
        state.message = action.payload.msg;
        state.user = action.payload;
        state.isEmailVerificationSuccess = action.payload.success;
        state.token = action.payload.data.orang.user_jwt_token;
      })
      .addCase(emailVerification.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.msg;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isError = state.isSuccess === false ? true : false;
        state.isSuccess = action.payload.success;
        state.message = action.payload.msg;
        state.user = action.payload;
        state.token = action.payload.data.user.user_jwt_token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.msg;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        console.log(action);
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
