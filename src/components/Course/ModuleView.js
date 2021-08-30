import React, { useEffect } from "react";
import "./ModuleView.css";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchAllCourses,
  setCourses,
} from "../../stateManagement/reducers/Course/courseSlice";
import parse from "html-react-parser";
import { useLocation } from "react-router-dom";

const ModuleView = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const courses = useSelector((state) => state.course.courses);
  console.log(courses);
  useEffect(() => {
    if (courses.length > 0) {
      return;
    } else {
      return dispatch(fetchAllCourses()).then((res) => setCourses(res.payload));
    }
  }, [courses, dispatch]);
  
 
  const module = location.state;
 

  return (
    <div className="module-view">
      <h2 className="module-title-view">{module.title}</h2>
      <hr />
      <p className="module-overview-view">{module.overview}</p>
      <hr/>
      <div className="module-content">{parse(module.body)}</div>
    </div>
  );
};

export default ModuleView;
