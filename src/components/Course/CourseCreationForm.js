import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../../stateManagement/reducers/Course/courseSlice";
import "./CourseCreation.css";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CourseCreationForm() {
  const history = useHistory();
  const [courseTitle, setCourseTitle] = useState("");
  const [courseOverview, setCourseOverview] = useState("");
  const loginState = useSelector((state) => state.login);
  const courseState = useSelector((state) => state.course);
  const isLoading = courseState.isLoading;
  const errors = courseState.errors;
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: courseTitle,
      overview: courseOverview,
      owner: loginState.user.id,
    };
    dispatch(createCourse(data)).then((res) => {
      if (res.payload) {
        if (res.payload.hasOwnProperty("title")) {
          toast.success("Course created successfully !", { autoClose: 50000 });

          return history.push(`/course/${res.payload._id}/modules/create`,res.payload);
        } else if (res.payload.payload.message) {
          toast.error(res.payload.payload.message);
        }
      }
    });
  };
  return (
    <div className="course-creation">
      <h3 className="course-creation-message">
        Create an engaging course today
      </h3>
      <form className="form-control" onSubmit={handleSubmit}>
        <label htmlFor="course-title">Title</label>
        <input
          type="text"
          id="course-title"
          onChange={(e) => setCourseTitle(e.target.value)}
          placeholder="Course title"
          className="course-title"
        />
        {errors.title && <p className="error">{errors.title}</p>}
        <textarea
          className="course-overview"
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

export default CourseCreationForm;
