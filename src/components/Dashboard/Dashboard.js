import { React, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentProfile } from "../../stateManagement/reducers/User/profileSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllCourses } from "../../stateManagement/reducers/Course/courseSlice";
import "./Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileInfo from "./ProfileInfo";

function Dashboard() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses);

  useEffect(() => {
    dispatch(getCurrentProfile());
    if (courses.length > 0) {
      return;
    } else {
      dispatch(fetchAllCourses());
    }
  }, [dispatch, courses]);
  const user = useSelector((state) => state.login.user);

  let dashboardContent;
  const profile = useSelector((state) => state.profile.profile);
  const isLoading = useSelector((state) => state.profile.isLoading);

  if (profile === null || isLoading) {
    dashboardContent = <h1>Loading...</h1>;
  } else {
    if (Object.keys(profile).length > 0) {
      dashboardContent = (
        <ProfileInfo profile={profile} user={user} courses={courses} />
      );
    } else {
      dashboardContent = (
        <div className="no-profile-page">
          <p className="lead text-muted">Welcome {user.firstName}</p>
          <p>
            You have not set up a profile yet, please add your profile info.
          </p>
          <div className="profile-creation-link">
            <Link to="/profile_create" className="profile-button">
              Create profile
            </Link>
          </div>
        </div>
      );
    }
  }
  return <div className="dashboard">{dashboardContent}</div>;
}

export default Dashboard;
