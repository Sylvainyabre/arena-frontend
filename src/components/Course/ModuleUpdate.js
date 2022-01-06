import React, {useState,useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateModule } from "../../stateManagement/reducers/Course/courseSlice";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ModuleCreation.css";
import { useLocation } from "react-router-dom";
import { tinyInit } from "../../utils/tinyEditorConfigs";
import { Editor } from "@tinymce/tinymce-react";

function ModuleUpdate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const isLoading = useSelector((state) => state.course.isLoading);
  const errors = useSelector((state) => state.course.errors);
 //const { courseId } = useParams();
  const editorRef = useRef(null);
  const module = location.state;
  const [moduleTitle, setModuleTitle] = useState(module.title);
  const [moduleOverview, setModuleOverview] = useState(module.overview);
  const [moduleBody, setModuleBody] = useState(module.body);

 


  const handleSubmit = (e) => {
    e.preventDefault();

    const content = editorRef.current.getContent();
    const updatedModule = {
        moduleId: module._id,
        title: moduleTitle,
        overview: moduleOverview,
        body:content
      }
     
    dispatch(
      updateModule(updatedModule)
    ).then((res) => {
      if (res.payload) {
        if (res.payload.hasOwnProperty("title")) {
          toast.success("Module updated successfully !", { autoClose: 5000 });
          history.push("/");
        } else if (res.payload.payload.message) {
          toast.error(res.payload.payload.message);
        }
      }
    });
  };

  return (
    <div className="module-creation">
      <form className="module-form form-control" onSubmit={handleSubmit}>
        <fieldset>
          <legend>
            Update the module <h2>{module.title}</h2>.
          </legend>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="module title"
            className="module-title-input"
            value={moduleTitle}
            onChange={(e) => setModuleTitle(e.target.value)}
          />
          {errors.title && <p className="error">{errors.title}</p>}
          <label htmlFor="module-overview">Module overview</label>
          <textarea
            className="module-overview"
            id="module-overview"
            onChange={(e) => setModuleOverview(e.target.value)}
            value={moduleOverview}
            placeholder="Write a short overview of the course here."
          ></textarea>
          {errors.overview && <p className="error">{errors.overview}</p>}
          <label htmlFor="editor" className="editor-label">
            Module body
          </label>
          <Editor
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue={moduleBody}
            init={tinyInit}
          />
          {errors.body && <p className="error">{errors.body}</p>}
        </fieldset>
        {isLoading ? (
          "Creating course..."
        ) : (
          <input type="submit" className="course-creation-button" />
        )}
        {errors.message && <p className="error">{errors.message}</p>}
      </form>
    </div>
  );
}

export default ModuleUpdate;
