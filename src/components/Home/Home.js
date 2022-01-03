import React, { useEffect } from "react";
import "./Home.css";
import CourseCard from "../Course/CourseCard";
import { fetchAllCourses } from "../../stateManagement/reducers/Course/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

function Home() {
  const dispatch = useDispatch();
  let courses = useSelector((state) => state.course.courses);
  const isLoading = useSelector((state) => state.course.isLoading);
  useEffect(() => {
    if (courses.length > 0) {
      return;
    } else {
      dispatch(fetchAllCourses());
    }
  }, [courses, dispatch]);

  const cards = courses.map((course) => (
    <CourseCard course={course} key={course.createdAt} />
  ));

  return (
    <div className="home">
      {isLoading ? (
        <Spinner animation="border" role="status" className="courses-loading mx-auto">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div className="container cards-container">{cards}</div>
      )}
    </div>
  );
}

export default Home;
