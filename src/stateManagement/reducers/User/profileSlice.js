import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  profileCreationUrl,
  profileEducationCreationUrl,
  currentUserProfileUrl,
} from "../../../api/authUrls";
import { API } from "../../../api/index";

const initialState = {
  errors: {},
  isLoading: false,
  isCreated: false,
  profile: null,
};

export const addProfileEducation = createAsyncThunk(
  "profile/addProfileEducation",
  async (data, { dispatch }) => {
    try {
      await API.post(profileEducationCreationUrl, data);
    } catch (err) {
      dispatch(get_errors(err.response.data));
    }
  }
);

export const createProfile = createAsyncThunk(
  "profile/createProfile",
  async ({ status, bio }, { dispatch }) => {
    try {
      const res = await API.post(profileCreationUrl, { status, bio });

      return res.data;
    } catch (err) {
      return dispatch(get_errors(err.response.data));
    }
  }
);

export const getCurrentProfile = createAsyncThunk(
  "profile/getCurrentProfile",
  async (_, { dispatch }) => {
    try {
      const res = await API.get(currentUserProfileUrl).then((res) =>
        dispatch(set_profile(res.data))
      );

      return res.data;
    } catch (err) {
      dispatch(set_profile({})); //Do not throw error when profile is not existent.
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    get_errors: (state, { payload }) => {
      return { ...state, errors: payload };
    },
    set_profile: (state, { payload }) => {
      return { ...state, profile: payload };
    },
    clear_profile: (state) => {
      return { ...state, profile: null };
    },
  },
  extraReducers: {
    [createProfile.pending]: (state) => {
      return { ...state, isLoading: true };
    },
    [createProfile.rejected]: (state) => {
      return { ...state, isLoading: false, isCreated: false };
    },
    [createProfile.fulfilled]: (state) => {
      return { ...state, isLoading: false };
    },
    [getCurrentProfile.pending]: (state) => {
      return { ...state, isLoading: true };
    },
    [getCurrentProfile.rejected]: (state) => {
      return { ...state, isLoading: false };
    },
    [getCurrentProfile.fulfilled]: (state) => {
      return { ...state, isLoading: false };
    },
  },
});

const { reducer, actions } = profileSlice;
export const { get_errors, set_profile, clear_profile } = actions;
export default reducer;
