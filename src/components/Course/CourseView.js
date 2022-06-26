import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./CourseView.css";
import { useLocation } from "react-router-dom";
import { enroll } from "../../stateManagement/reducers/Course/courseSlice";
import { toast } from "react-toastify";
import CourseModules from "./CourseModules";
import { Spinner } from "react-bootstrap";


const CourseView = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  let course = location.state;
  let isLoading = useSelector((state) => state.course.isLoading);
  let user = useSelector((state) => state.login.user);

  const isEnrolled = (user, courseId) => {
    if (!user || !user.enrollments) {
      return false;
    } else if (!user.enrollments.length > 0) {
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
        if (res.payload.hasOwnProperty("email")) {
          //payload should return user on success which has a property email
          toast.success("Enrolled successfully ");
          isOwner = true;
        }
      });
    }
  };

  // const modulesDisplay =
  //   course.modules.length > 0 ? (
  //     course.modules.map((mod) => <PermanentDrawerRight course={course} />)
  //   ) : (
  //     <h5>No modules for this course.</h5>
  //   );

  return (
    <>
      {isLoading ? (
        <Spinner
          animation="border"
          role="status"
          className="courses-loading mx-auto"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div className="course-view container-fluid">
          <div className="section container course-top">
            
            <h3 className="course-view-title">{course.title}</h3>
            <hr />

            <p className="course-view-overview">{course.overview}</p>
            
            <hr />
            <h2>Course modules</h2>
            <CourseModules course ={course}/>
          </div>
          <div className="course-modules"></div>

        </div>
      )}
    </>
  );
};

export default CourseView;
