import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteCourse,
  setCourse,
} from "../../stateManagement/reducers/Course/courseSlice";
import { useHistory } from "react-router-dom";
import EditIcon from "./EditIcon";
import DeleteIcon from "./DeleteIcon";
import "./Dashboard.css";
import { toast } from "react-toastify";

function CreatedCourse(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const deleteFunction = () => {
    const confirmDelete = window.confirm("Delete this Course ?");
    if (confirmDelete) {
      dispatch(deleteCourse(props.course._id)).then((res) => {
        if (res.payload === "") {
          toast.success("Course deleted successfully");
        }
        
      });
    }
  };
  const handleClick = ()=>{
    history.push(`/course/${props.course._id}/view`,props.course)
  }
  return (
    <div className="user-course">
      <h5 className="user-course-title">{props.course.title}</h5>
      <button onClick={handleClick} className="course-button">
        Go to course
      </button>
      <button
        className="module-button"
        onClick={() => {
          dispatch(
            setCourse(props.courses.find((c) => c._id === props.course._id))
          );
          history.push(`/course/${props.course._id}/modules/create`, props.course);
        }}
      >
        Add module
      </button>
      <button
        className="edit-button"
        onClick={() => {
          dispatch(
            setCourse(props.courses.find((c) => c._id === props.course._id))
          );
          history.push(`/course/${props.course._id}/update`);
        }}
      >
        <EditIcon />
        Edit
      </button>
      <button className="delete-button" onClick={deleteFunction}>
        <DeleteIcon />
      </button>
      <hr/>
      <small className = "module-number text-muted">{props.course.modules.length} modules</small>
    </div>
  );
}

export default CreatedCourse;
