import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { passwordRequestUrl } from "../../../api/authUrls";
import { API } from "../../../api/index";

const initialState = { isRequested: false, isLoading: false, error: {} };
export const requestPassword = createAsyncThunk(
  "password/requestPassword",
  async (email, { dispatch }) => {
    try {
      await API.post(passwordRequestUrl, email);

      return dispatch(emailSent());
    } catch (err) {
      return dispatch(get_errors(err.response.data));
    }
  }
);

const passwordRequestSlice = createSlice({
  name: "passwordRequest",
  initialState,
  reducers: {
    get_errors: (state, { payload }) => {
      //state.error = payload;
      //state.isLoading = false;
      return { ...state, isLoading: false, error: payload };
    },
    emailSent: (state) => {
      //state.isRequested = true;
      // state.isLoading = false;
      // state.error = {};
      return { ...state, isLoading: false, error: {}, isRequested: true };
    },
  },
  extraReducers: {
    [requestPassword.pending]: (state) => {
      //state.isLoading = true;
      return { ...state, isLoading: true };
    },
    [requestPassword.fulfilled]: (state) => {
      //state.isLoading = false;
      return { ...state, isLoading: false };
    },
    [requestPassword.rejected]: (state, { payload }) => {
      //state.error = payload
      return { ...state, error: payload };
    },
  },
});
const { reducer, actions } = passwordRequestSlice;
export const { get_errors, emailSent } = actions;
export default reducer;
