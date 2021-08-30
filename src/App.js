import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RegistrationForm from "./components/Auth/Register";
import LoginForm from "./components/Auth/LoginForm";
import PasswordResetRequest from "./components/Auth/PasswordResetRequest";
import PasswordReset from "./components/Auth/PasswordReset";
import CourseUpdate from "./components/Course/CourseUpdate";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "./stateManagement/setAuthToken";
import {
  setCurrentUser,
  userLogout,
} from "./stateManagement/reducers/User/loginSlice";
import store from "./stateManagement/store";
import passwordRequested from "./components/Auth/passwordRequested";
import { clear_profile } from "./stateManagement/reducers/User/profileSlice";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/Dashboard/PrivateRoute";
import CreateProfile from "./components/ProfileCreation/CreateProfile";
import CourseCreationForm from "./components/Course/CourseCreationForm";
import ModuleCreation from "./components/Course/ModuleCreation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CourseView from "./components/Course/CourseView";
import ModuleUpdate from "./components/Course/ModuleUpdate";
import ModuleView from "./components/Course/ModuleView";

import { fetchAllCourses } from "./stateManagement/reducers/Course/courseSlice";

//check if token exists and set the current User to it
const token = localStorage.getItem("jwtToken");

//console.log("Saved "+ saved_courses)
if (token) {
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(userLogout());
    store.dispatch(clear_profile());
    window.location.href = "/login";
  }
}
let courses = store.getState().course.courses;
if (!courses) {
  console.log("courses empty, fetching...");
  store.dispatch(fetchAllCourses());
}
function App() {
  

  const authState = useSelector((state) => state.login);

  return (
    <div className="App">
      <Router>
        <Header />
        <ToastContainer />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={RegistrationForm} />
          <Route path="/login" exact component={LoginForm} />

          <PrivateRoute
            path="/dashboard"
            authState={authState}
            exact
            component={Dashboard}
          />
          <PrivateRoute
            path="/course/create"
            authState={authState}
            component={CourseCreationForm}
          />
          <PrivateRoute
            path="/course/:courseId/modules/create"
            authState={authState}
            component={ModuleCreation}
          />
          <PrivateRoute
            path="/course/:courseId/update"
            authState={authState}
            component={CourseUpdate}
          />
          <PrivateRoute
            path="/course/:courseId/view"
            authState={authState}
            component={CourseView}
          />
          <PrivateRoute
            path="/course/module/:courseId/:moduleId/update"
            authState={authState}
            component={ModuleUpdate}
          />
          <PrivateRoute
            path="/module/:courseId/:moduleId/view"
            authState={authState}
            component={ModuleView}
          />

          <Route path="/profile_create" component={CreateProfile} />
          <Route path="/password/requested" component={passwordRequested} />
          <Route path="/profile/:profileId" component={Dashboard} />

          <Route
            path="/password/reset"
            exact
            component={PasswordResetRequest}
          />
          <Route
            path="/password/reset/:token/:userId"
            exact
            component={PasswordReset}
          />
        </Switch>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
