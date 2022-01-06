import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addModule } from "../../stateManagement/reducers/Course/courseSlice";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";

import "./ModuleCreation.css";
import { useLocation } from "react-router-dom";
import { tinyInit } from "../../utils/tinyEditorConfigs";

function ModuleCreation() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleOverview, setModuleOverview] = useState("");
  //const [moduleBody, setModuleBody] = useState("");
  const isLoading = useSelector((state) => state.course.isLoading);
  const errors = useSelector((state) => state.course.errors);
  const { courseId } = useParams();
  const editorRef = useRef(null);

  const course = location.state;
  const handleSubmit = (e) => {
    e.preventDefault();
    const content = editorRef.current.getContent();
    dispatch(
      addModule({
        courseId: courseId,
        title: moduleTitle,
        overview: moduleOverview,
        body: content,
      })
    ).then((res) => {
      if (res.payload) {
        if (res.payload.hasOwnProperty("modules")) {
          toast.success("Module created successfully !", { autoClose: 5000 });
          history.push("/");
        }
      }
    });
  };

  return (
    <div className="module-creation">
      <form className="module-form form-control" onSubmit={handleSubmit}>
        <fieldset>
          <legend>
            Add a module to <h2>{course.title}</h2>.
          </legend>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="module title"
            className="module-title-input"
            onChange={(e) => setModuleTitle(e.target.value)}
          />
          {errors.title && <p className="error">{errors.title}</p>}
          <label htmlFor="module-overview">Module overview</label>
          <textarea
            className="module-overview"
            id="module-overview"
            onChange={(e) => setModuleOverview(e.target.value)}
            placeholder="Write a short overview of the course here."
          ></textarea>
          {errors.overview && <p className="error">{errors.overview}</p>}
          <label htmlFor="editor" className="editor-label">
            Module body
          </label>
          <Editor
            init={tinyInit}
            onInit={(evt, editor) => (editorRef.current = editor)}
          />

          {errors.body && <p className="error">{errors.body}</p>}
        </fieldset>
        {isLoading ? (
          "Creating course..."
        ) : (
          <input type="submit" className="course-creation-button" />
        )}
      </form>
    </div>
  );
}

export default ModuleCreation;
