import React from "react";
import "./CourseCard.css";
import { useDispatch } from 'react-redux';
import {setCourse } from "../../stateManagement/reducers/Course/courseSlice";
import { useHistory } from "react-router";

function CourseCard({course}) {
 const dispatch  = useDispatch()
 const history = useHistory()

  const handleClick = ()=>{
     const courseLink = `/course/${course._id}/view`;
     dispatch(setCourse(course))
     history.push(courseLink,course)


  }

  
  
  return (
    <div className="card container">
      <div className="card-body">
        <h5 className="card-title">{course.title}</h5>
        <hr/>
        <p className="card-text">{course.overview}</p>
       
        <button onClick={handleClick} className="btn btn-primary">
          Go to course
        </button>
        <hr/>
        <small className = "module-number text-muted">{course.modules.length} modules</small>
       
      </div>
    </div>
  );
}

export default CourseCard;
