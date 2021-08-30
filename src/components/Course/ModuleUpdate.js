import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateModule } from "../../stateManagement/reducers/Course/courseSlice";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { toolbar } from "../../utils/editorconfigs";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ModuleCreation.css";
import { useLocation } from 'react-router-dom';

function ModuleUpdate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation()

  const isLoading = useSelector((state) => state.course.isLoading);
  const errors = useSelector((state) => state.course.errors);
  const { courseId } = useParams();

  const module = location.state
  const [moduleTitle, setModuleTitle] = useState(module.title);
  const [moduleOverview, setModuleOverview] = useState(module.overview);
  const [moduleBody, setModuleBody] = useState(module.body);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateModule({
        courseId: courseId,
        moduleId:module._id,
        title: moduleTitle,
        overview: moduleOverview,
        body: moduleBody,
      })
    ).then((res) => {
      if (res.payload) {
          console.log(res.payload)
        if (res.payload.hasOwnProperty("title")) {
          toast.success("Module updated successfully !", { autoClose: 5000 });
          history.push("/");
        }else if(res.payload.payload.message){
            toast.error(res.payload.payload.message)
        }
      }
    });
  };

  const editorConfiguration = {
    toolbar: {
      items: toolbar,
    },
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
            value = {moduleTitle}
            onChange={(e) => setModuleTitle(e.target.value)}
          />
          {errors.title && <p className="error">{errors.title}</p>}
          <label htmlFor="module-overview">Module overview</label>
          <textarea
            className="module-overview"
            
            id="module-overview"
            onChange={(e) => setModuleOverview(e.target.value)}
            value = {moduleOverview}
            placeholder="Write a short overview of the course here."
          ></textarea>
          {errors.overview && <p className="error">{errors.overview}</p>}
          <label htmlFor="editor" className="editor-label">
            Module body
          </label>
          <CKEditor
            className="editor"
            id="editor"
            editor={Editor}
            data =  {moduleBody}
            config={editorConfiguration}
            onChange={(e, editor) => {
              setModuleBody(editor.getData());
              
            }}
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
