import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./reducers/User/loginSlice";
import registrationReducer from "./reducers/User/registrationSlice";
import passwordRequestReducer from "./reducers/User/passwordRequestSlice";
import passwordResetReducer from "./reducers/User/passwordResetSlice";
import profileReducer from "./reducers/User/profileSlice";
import courseReducer from "./reducers/Course/courseSlice";
//redux-first-history

const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registrationReducer,
    passwordRequest: passwordRequestReducer,
    passwordReset: passwordResetReducer,
    profile: profileReducer,
    course: courseReducer,
  },
});

export default store;
