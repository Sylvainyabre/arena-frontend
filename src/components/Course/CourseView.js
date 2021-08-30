import React from "react";
import ModuleCard from "./ModuleCard";
import { useSelector, useDispatch } from "react-redux";
import "./CourseView.css";

import { left } from "@popperjs/core";

import { useLocation } from "react-router-dom";
import { enroll } from "../../stateManagement/reducers/Course/courseSlice";
import { toast } from "react-toastify";

const CourseView = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const course = location.state;
  let isLoading = useSelector((state) => state.course.isLoading);
  const user = useSelector((state) => state.login.user);

  const isEnrolled = (user, courseId) => {
    if (!user.enrollments.length > 0) {
      return false;
    } //check if user is enrolled
    else if (user.enrollments.indexOf(courseId) === -1) {
      return false;
    } else {
      return true;
    }
  };

  let isOwner = String(user.id) === String(course.owner);

  const handleEnrollment = () => {
    const confirmEnrollment = window.confirm("Enroll in this Course ?");
    if (confirmEnrollment) {
      dispatch(enroll(course._id)).then((res) => {
       if(res.payload.hasOwnProperty("email")){ 
         //payload should return user on success which has a property email
         toast.success("Enrolled successfully ")
         isOwner = true

       }
      });
    }
  };

  const modulesDisplay =
    course.modules.length > 0 ? (
      course.modules.map((mod) => (
        <ModuleCard key={mod._id} module={mod} course={course} user={user} />
      ))
    ) : (
      <h5>No modules for this course.</h5>
    );

  return (
    <>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <div className="course-view container-fluid">
          <div className="section container course-top">
            <h3 className="course-view-title">{course.title}</h3>
            <hr />

            <p className="course-view-overview">{course.overview}</p>
            <hr />
          </div>
          <div className="course-modules"></div>
          {isEnrolled(user, course._id) || isOwner ? (
            modulesDisplay
          ) : (
            <button
              onClick={handleEnrollment}
              className="btn btn-secondary btn-lg enroll-button"
            >
              Enroll
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default CourseView;
