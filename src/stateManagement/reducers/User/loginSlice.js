import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../../api";
import { loginUrl } from "../../../api/authUrls";
import { setAuthToken } from "../../setAuthToken";
import { isEmpty } from "../../isEmpty";
import jwt_decode from "jwt-decode";

const initialState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  errors: {},
};

export const userLogin = createAsyncThunk(
  "login/userLogin",
  async ({ email, password }, { dispatch }) => {
    try {
      const loginResponse = await API.post(loginUrl, { email, password });

      //grabbing the token sent by the login response
      const token = loginResponse.data.token;

      //setting the token to local storage
      if (token) {
        localStorage.setItem("jwtToken", token);
        //setting the Authorization headers
        setAuthToken(token);
        //decoding the jwt Token
        const decoded = await jwt_decode(token);
        return await dispatch(setCurrentUser(decoded));
      }
    } catch (err) {
      dispatch(get_errors(err.response.data));
    }
  }
);
export const userLogout = createAsyncThunk(
  "login/userLogout",
  async (_, { dispatch }) => {
    try {
      localStorage.removeItem("jwtToken");
      setAuthToken(false);
      dispatch(setCurrentUser(null));
    } catch (err) {
      dispatch(get_errors(err.response.data));
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      //state.isAuthenticated = !isEmpty(payload);
      //state.user = payload;
      //state.errors = {} ;
      return {
        ...state,
        isAuthenticated: !isEmpty(payload),
        user: payload,
        errors: {},
      };
      //setCurrentUser is dispatched with the decoded user as payload.
      // user therefore not authenticated if payload is empty
    },

    get_errors: (state, { payload }) => {
      //state.errors = payload;
      return { ...state, errors: payload };
    },
  },

  extraReducers: {
    [userLogin.pending]: (state) => {
      //state.isLoading = true;
      return { ...state, isLoading: true };
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      //state.user = payload;
      //state.isLoading = false;
      return { ...state, isLoading: false };
    },
    [userLogin.rejected]: (state) => {
      //state.isAuthenticated = false;
      //state.isLoading = false;
      return { ...state, isAuthenticated: false, isLoading: false };
    },
    [userLogout.pending]: (state) => {
      //state.isLoading = true;
      return { ...state, isLoading: true };
    },
    [userLogout.rejected]: (state) => {
      //state.isLoading = false;
      return { ...state, isLoading: false };
    },
    [userLogout.fulfilled]: (state) => {
      //state.isLoading = false;
      return { ...state, isLoading: false };
    },
  },
});

const { reducer, actions } = loginSlice;
export const { get_errors, setCurrentUser } = actions;
export default reducer;
