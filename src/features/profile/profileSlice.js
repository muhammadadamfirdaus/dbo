import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "./profileService";

const initialState = {
  message: "",
  profile: {},
  statusKYC: "rejected",
  isError: false,
  isSuccess: false,
  isLoading: false,
};

// get profile
export const getProfile = createAsyncThunk("profiles/detail", async (_, thunkAPI) => {
  // console.log(thunkAPI);
  try {
    const token = thunkAPI.getState().auth.user.data.user.user_jwt_token || thunkAPI.getState().auth.user.data.orang.user_jwt_token;
    // console.log(token);
    return await profileService.getProfile(token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    if (error.response.status === 401) {
      localStorage.setItem("user", JSON.stringify(error.response.data));
    }

    return thunkAPI.rejectWithValue(message);
  }
});

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = state.isSuccess === false ? true : false;
        state.isSuccess = action.payload.success;
        state.message = action.payload && action.payload.msg;
        state.profile = action.payload;
        state.statusKYC = action.payload.data.status_kyc;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload && action.payload.msg;
      });
  },
});

export const { reset } = profileSlice.actions;
export default profileSlice.reducer;
