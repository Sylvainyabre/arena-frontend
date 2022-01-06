import React, { useEffect } from "react";
import "./Home.css";
import CourseCard from "../Course/CourseCard";
import { fetchAllCourses } from "../../stateManagement/reducers/Course/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { Row } from "react-bootstrap";

function Home() {
  const dispatch = useDispatch();
  let courses = useSelector((state) => state.course.courses);
  const isLoading = useSelector((state) => state.course.isLoading);
  useEffect(() => {
    dispatch(fetchAllCourses());
  },[]);

  const cards = courses.map((course) => (
    <CourseCard course={course} key={course.createdAt} />
  ));

  return (
    <div className="home">
      {isLoading ? (
        <Spinner
          animation="border"
          role="status"
          className="courses-loading mx-auto"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Row xs={1} sm={2} md={3} className="cards">
          {cards}
        </Row>
      )}
    </div>
  );
}

export default Home;
