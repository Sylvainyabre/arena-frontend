import React, { useEffect } from "react";
import "./ModuleView.css";
import { useDispatch, useSelector } from "react-redux";
import Prism from "prismjs"

import {
  fetchAllCourses,
  setCourses,
} from "../../stateManagement/reducers/Course/courseSlice";
import { useLocation } from "react-router-dom";
const HtmlToReactParser = require("html-to-react").Parser; 
const htmlToReactParser = new HtmlToReactParser();
const ModuleView = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  let courses = useSelector((state) => state.course.courses);
 
  useEffect(() => {
    if (courses.length > 0) {
      return;
    } else {
      return dispatch(fetchAllCourses()).then((res) => setCourses(res.payload));
    }
  }, [courses, dispatch]);
  
 useEffect(()=>{
   Prism.highlightAll();
 });
  const module = location.state;
  const result = htmlToReactParser.parse(module.body);
 
 

  return (
    <div className="module-view">
      <h2 className="module-title-view">{module.title}</h2>
      <hr/>
      <p className="module-overview-view">{module.overview}</p>
      <hr/>
      <div className="module-content">{result}</div>
    </div>
  );
};

export default ModuleView;
