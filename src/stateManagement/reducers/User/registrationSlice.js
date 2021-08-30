import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../../api";
import { registrationUrl } from "../../../api/authUrls";

const initialState = {
  errors: {},
  isRegistered: false,
  isLoading: false,
};

export const registerUser = createAsyncThunk(
  "registration/registerUser",
  async (newUser, { dispatch, getState }) => {
    try {
      const res = await API.post(registrationUrl, newUser);
      if (res.status === 200) {
        return dispatch(registrationSuccess());
      }
    } catch (err) {
      return dispatch(get_errors(err.response.data));
    }
  }
);

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    get_errors: (state, { payload }) => {
      //state.errors = payload;
      return { ...state, errors: payload };
    },
    registrationSuccess: (state) => {
      //state.isRegistered  = true
      //tate.errors = {};
      return { ...state, errors: {}, isRegistered: true };
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      //state.isLoading = true;
      return { ...state, isLoading: true };
    },
    [registerUser.fulfilled]: (state) => {
      state.isLoading = false;
      return { ...state, isLoading: false };
    },
    [registerUser.rejected]: (state, { payload }) => {
      //state.errors = payload;
      //state.isRegistered = false;
      return { ...state, isRegistered: false, errors: payload };
    },
  },
});

const { reducer, actions } = registrationSlice;
export const { get_errors, registrationSuccess } = actions;
export default reducer;
