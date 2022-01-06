import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  courseCreationUrl,
  courseDeleteUrl,
  courseUpdateUrl,
  allCoursesUrl,
  moduleCreationUrl,
  courseUrl,
  moduleUpdateUrl,
  moduleDeleteUrl,
  courseEnrollmentUrl,
  courseDropUrl,
} from "../../../api/courseUrls";
import { API } from "../../../api";
import { setCurrentUser } from "../User/loginSlice";

const initialState = {
  errors: {},
  isLoading: false,
  isCreated: false,
  course: null,
  courses: [],
};

//create a new course with owner, title and overview
export const createCourse = createAsyncThunk(
  "courses/createCourse",
  async ({ title, imageURL, overview}, { dispatch }) => {
    console.log(title, imageURL);
    try {
      const res = await API.post(courseCreationUrl, {
        title,
        imageURL,
        overview
      });
      await dispatch(setCourse(res.data));
      return res.data;
    } catch (err) {
      return dispatch(get_errors(err.response.data));
    }
  }
);

//delete a course by Id
export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async (courseId, { dispatch }) => {
    try {
      const res = await API.delete(courseDeleteUrl(courseId));

      return res.data;
    } catch (err) {
      return dispatch(get_errors(err.response.data));
    }
  }
);
//update a course
export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async ({ courseId, title, overview }, { dispatch }) => {
    try {
      const res = await API.put(courseUpdateUrl(courseId), { title, overview });
      return res.data;
    } catch (error) {
      return dispatch(get_errors(error.response.data));
    }
  }
);
//enroll in a course
export const enroll = createAsyncThunk(
  "courses/enroll",
  async (courseId, { dispatch }) => {
    try {
      const res = await API.post(courseEnrollmentUrl(courseId));

      if (res.data.hasOwnProperty("email")) {
        dispatch(setCurrentUser(res.data));
      }
      return res.data;
    } catch (error) {
      return dispatch(get_errors(error.response.data));
    }
  }
);
// drop course
export const dropCourse = createAsyncThunk(
  "courses/dropCourse",
  async (courseId, { dispatch }) => {
    try {
      const res = await API.post(courseDropUrl(courseId));

      return res;
    } catch (error) {
      return dispatch(get_errors(error.response.data));
    }
  }
);
//get all courses
export const fetchAllCourses = createAsyncThunk(
  "courses/fetchAllCourses",
  async (_, { dispatch }) => {
    try {
      const res = await API.get(allCoursesUrl);
      const courses = res.data;
      return await dispatch(setCourses(courses));
    } catch (error) {
      return dispatch(get_errors(error.response.data));
    }
  }
);
//add a module to a course
export const addModule = createAsyncThunk(
  "courses/addModule",
  async ({ courseId, title, overview, body }, { dispatch }) => {
    try {
      const res = await API.post(moduleCreationUrl(courseId), {
        title,
        overview,
        body,
      });
      return res.data;
    } catch (error) {
      return dispatch(get_errors(error.response.data));
    }
  }
);

//update a module
export const updateModule = createAsyncThunk(
  "courses/updateModule",
  async ({ moduleId, title, overview, body }, { dispatch }) => {
    try {
      const res = await API.put(moduleUpdateUrl(moduleId), {
        title,
        overview,
        body,
      });
      return res.data;
    } catch (error) {
      return dispatch(get_errors(error.response.data));
    }
  }
);
//delete a module
export const deleteModule = createAsyncThunk(
  "courses/deleModule",
  async ({ courseId, moduleId }, { dispatch }) => {
    try {
      const res = await API.delete(moduleDeleteUrl(courseId, moduleId));
      return res.data;
    } catch (error) {
      return dispatch(get_errors(error.response.data));
    }
  }
);

//get a course by id
export const fetchCourse = createAsyncThunk(
  "courses/fetchCourse",
  async (courseId, { dispatch }) => {
    try {
      const res = await API.get(courseUrl(courseId));
      await dispatch(setCourse(res.data));
      return res.data;
    } catch (error) {
      return dispatch(get_errors(error.response.data));
    }
  }
);

export const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    get_errors: (state, { payload }) => {
      return { ...state, errors: payload };
    },
    setCourse: (state, { payload }) => {
      return { ...state, course: payload };
    },
    setCourses: (state, { payload }) => {
      return { ...state, courses: payload };
    },
  },
  extraReducers: {
    //CreateCourse
    [createCourse.pending]: (state) => {
      //state.isLoading = true;
      return { ...state, isLoading: true };
    },
    [createCourse.rejected]: (state) => {
      //state.isCreated = false;
      //state.isLoading = false;
      return { ...state, isCreated: false, isLoading: true };
    },
    [createCourse.fulfilled]: (state, { payload }) => {
      //state.isLoading = false;
      //state.isCreated = true;
      return { ...state, isLoading: false, isCreated: true };
    },
    //fetchAllCourses
    [fetchAllCourses.pending]: (state) => {
      //state.isLoading = true;
      return { ...state, isLoading: true };
    },
    [fetchAllCourses.rejected]: (state) => {
      //state.isLoading = false;
      return { ...state, isLoading: false };
    },
    [fetchAllCourses.fulfilled]: (state) => {
      //state.isLoading = false;
      return { ...state, isLoading: false };
    },
    //addModule
    [addModule.pending]: (state) => {
      //state.isLoading = true;
      return { ...state, isLoading: true };
    },
    [addModule.rejected]: (state) => {
      //state.isLoading = false;
      return { ...state, isLoading: false };
    },
    [addModule.fulfilled]: (state) => {
      //state.isLoading = false;
      return { ...state, isLoading: false };
    },
    [updateModule.pending]: (state) => {
      //state.isLoading = true;
      return { ...state, isLoading: true };
    },
    [updateModule.rejected]: (state, { payload }) => {
      //state.isLoading = true;
      return { ...state, errors: payload, isLoading: false };
    },
    [updateModule.fulfilled]: (state) => {
      //state.isLoading = true;
      return { ...state, isLoading: false };
    },
    //updateModule
    [updateCourse.fulfilled]: (state) => {
      //state.isLoading = false;
      return { ...state, isLoading: false };
    },
    [updateCourse.pending]: (state) => {
      //state.isLoading = true;
      return { ...state, isLoading: true };
    },
    [updateCourse.rejected]: (state, { payload }) => {
      //state.isLoading = false;
      return { ...state, errors: payload, isLoading: false };
    },
    //deleModule
    [deleteModule.fulfilled]: (state) => {
      return { ...state, isLoading: false };
    },
    [deleteModule.pending]: (state) => {
      return { ...state, isLoading: true };
    },
    [deleteModule.rejected]: (state, { payload }) => {
      return { ...state, errors: payload, isLoading: false };
    },
    //fetchCourse
    [fetchCourse.fulfilled]: (state) => {
      return { ...state, isLoading: false };
    },
    [fetchCourse.pending]: (state) => {
      return { ...state, isLoading: true };
    },
    [fetchCourse.rejected]: (state, { payload }) => {
      return { ...state, errors: payload, isLoading: false };
    },
  },
});

const { reducer, actions } = courseSlice;
export const { get_errors, setCourse, setCourses } = actions;
export default reducer;
