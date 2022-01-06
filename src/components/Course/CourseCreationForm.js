import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../../stateManagement/reducers/Course/courseSlice";
import "./CourseCreation.css";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadCourseImage } from "../../api/imageUpload";

function CourseCreationForm() {
  const history = useHistory();
  const [courseTitle, setCourseTitle] = useState("");
  const [image, setImage] = useState(null);
  const [courseOverview, setCourseOverview] = useState("");
  const loginState = useSelector((state) => state.login);
  const courseState = useSelector((state) => state.course);
  const isLoading = courseState.isLoading;
  const errors = courseState.errors;
  const dispatch = useDispatch();

  const validateCourseCreation = (res) => {
    console.log(res)
    if (res.payload) {
      if (res.payload.hasOwnProperty("title")) {
        toast.success("Course created successfully !", { autoClose: 50000 });

        return history.push(
          `/course/${res.payload._id}/modules/create`,
          res.payload
        );
      } else if (res.payload.payload.message) {
        toast.error(res.payload.payload.message);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      
      uploadCourseImage(image)
      .then((uploadResult) => {
      
        if (uploadResult.imagePath) {
       
          const imageURL = uploadResult.imagePath;
          const data = {
            title: courseTitle,
            imageURL: imageURL,
            overview: courseOverview,
          };
          
          dispatch(createCourse(data)).then((res) =>
            validateCourseCreation(res)
          );
        }
      });
    } catch (err) {
      toast.error(
        "Unsuccessful upload, please try again or contact your Webmaster."
      );
    }
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
        <label htmlFor="course-image">Course image: </label>
        <input
          type="file"
          accept="image/*"
          name="file"
          id="course-image"
          className="course-image"
          alt="Upload"
          onChange={(e) => setImage(e.target.files[0])}
        />
        {errors.ImageURL && <p className="error">{errors.ImageURL}</p>}
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
