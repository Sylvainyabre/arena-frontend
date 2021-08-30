import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import { setPasswordRequestUrl, setpasswordResetUrl } from "../../../api/authUrls";
import { API } from "../../../api";

const initialState = { isReset: false, isLoading: false, error: {} };
//const passwordResetUrl = setPasswordRequestUrl()
export const resetPassword = createAsyncThunk(
  "password/resetPassword",
  async ({ password, passwordConfirm, passwordResetUrl }, { dispatch }) => {
    try {
      const res = await API.post(passwordResetUrl, {
        password,
        passwordConfirm,
      });

      if (res.data.status === "success") {
        dispatch(successfulReset());
      }
      return res.data;
    } catch (err) {
      return dispatch(get_errors(err.response.data));
    }
  }
);

const passwordResetSlice = createSlice({
  name: "passwordReset",
  initialState,
  reducers: {
    get_errors: (state, { payload }) => {
      //state.error = payload;
      //state.isLoading = false;
      return { ...state, isLoading: false, error: payload };
    },
    successfulReset: (state) => {
      //state.isReset = true;
      //state.isLoading = false;
      //state.error = {};
      return { ...state, isLoading: false, error: {}, isReset: true };
    },
  },
  extraReducers: {
    [resetPassword.pending]: (state) => {
      //state.isLoading = true;
      return { ...state, isLoading: true };
    },
    [resetPassword.fulfilled]: (state) => {
      //state.isLoading = false;
      return { ...state, isLoading: false };
    },
    [resetPassword.rejected]: (state, { payload }) => {
      //state.isLoading = false
      //state.isReset = false
      //state.error = payload
      return { ...state, isLoading: false, isReset: false, error: payload };
    },
  },
});
const { reducer, actions } = passwordResetSlice;
export const { get_errors, successfulReset } = actions;
export default reducer;
