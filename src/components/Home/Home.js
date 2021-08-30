import React, { useEffect } from "react";
import "./Home.css";
import CourseCard from "../Course/CourseCard";
import { fetchAllCourses } from "../../stateManagement/reducers/Course/courseSlice";
import { useDispatch, useSelector } from "react-redux";


function Home() {

  const dispatch = useDispatch();
  let courses = useSelector((state) => state.course.courses);
  const isLoading = useSelector((state) => state.course.isLoading);
  useEffect(() => {
    if (courses.length > 0) {
      return;
    } else {
      dispatch(fetchAllCourses())
      
    }
  },[courses,dispatch]);
  



  const cards = courses.map((course) => (
    <CourseCard course={course} key={course.createdAt} />
  ));

  return (
    <div className="home">
     
      {isLoading ? (
        <h4 className="courses-loading">Loading...</h4>
      ) : (
        <div className="container cards-container">{cards}</div>
      )}
    </div>
  );
}

export default Home;
