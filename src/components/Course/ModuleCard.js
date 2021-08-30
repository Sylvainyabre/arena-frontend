import React from "react";
import DeleteIcon from "../Dashboard/DeleteIcon";
import EditIcon from "../Dashboard/EditIcon";
import "./ModuleCard.css";
import { useDispatch } from "react-redux";

import { deleteModule } from "../../stateManagement/reducers/Course/courseSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

const ModuleCard = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteFunction = () => {
    const confirmDelete = window.confirm("Delete this module ?");
    if (confirmDelete) {
      dispatch(
        deleteModule({ courseId: props.course._id, moduleId: props.module._id })
      ).then((res) => {
        if (res.payload === "") {
          toast.success("Module delete successfully");
        }
      });
    }
  };
  const handleClick = () => {
    const moduleLink = `/module/${props.course._id}/${props.module._id}/view`;
    history.push(moduleLink, props.module);
  };
  const handleEditClick = () => {
    const editLink = `/course/module/${props.course._id}/${props.module._id}/update`;
    history.push(editLink, props.module);
  };
  return (
    <section className="module">
      <h5 className="module-title">{props.module.title}</h5>
       <br/>
      <p className="module-description">{props.module.overview}</p>
      <br></br>
      <hr/>
      <div className="buttons">
        <button onClick={handleClick} className="module-read-button">
          Read 
        </button>
        {props.user._id === module.owner && (
          <button onClick={handleEditClick} className="module-edit-button">
            <EditIcon />
            Edit 
          </button>
        )}
        {props.user._id === module.owner && (
          <button onClick={deleteFunction} className="module-delete-button">
            <DeleteIcon />
          </button>
        )}
      </div>
    </section>
  );
};

export default ModuleCard;
