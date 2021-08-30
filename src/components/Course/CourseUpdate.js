import React, { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateCourse } from "../../stateManagement/reducers/Course/courseSlice";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CourseUpdate() {
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const history = useHistory();
  const courseState = useSelector((state) => state.course);
  const courses = courseState.courses;
  const course = courses.find((c) => c._id === courseId);
  const [courseTitle, setCourseTitle] = useState(course.title);
  const [courseOverview, setCourseOverview] = useState(course.overview);
  // const loginState = useSelector((state) => state.login);
  const isLoading = courseState.isLoading;
  const errors = courseState.errors;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      courseId: courseId,
      title: courseTitle,
      overview: courseOverview,
    };
    dispatch(updateCourse(data)).then((res) => {
      if (res.payload.hasOwnProperty("title")) {
        toast.success("Course updated successfully!");
        history.push("/dashboard");
      }
    });
  };
  return (
    <div className="course-creation">
      <h3 className="course-creation-message">Update your course.</h3>
      <form className="form-control" onSubmit={handleSubmit}>
        <label htmlFor="course-title">Title</label>
        <input
          type="text"
          id="course-title"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          placeholder="Course title"
          className="course-title"
        />
        {errors.title && <p className="error">{errors.title}</p>}
        <label htmlFor="course-overview">Overview</label>
        <textarea
          className="course-overview"
          id="course-overview"
          value={courseOverview}
          onChange={(e) => setCourseOverview(e.target.value)}
          placeholder="Write a short overview of the course here."
        ></textarea>
        {errors.overview && <p className="error">{errors.overview}</p>}
        {isLoading ? (
          "Creating course..."
        ) : (
          <input type="submit" className="course-creation-button" />
        )}
      </form>
    </div>
  );
}

export default CourseUpdate;
