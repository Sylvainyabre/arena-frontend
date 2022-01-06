import React, { useState } from "react";
import { ListGroup} from "react-bootstrap";
import { Link ,useHistory} from "react-router-dom";



function CourseModules({ course }) {
  const modules = course.modules;
  const history = useHistory();
  const handleClick = (module) =>{
     const moduleLink =  `/module/${course._id}/${module._id}/view`;
     history.push(moduleLink, module);
  }
  const displayedModules = modules.map((module) => (<ListGroup>
      <ListGroup.Item key={module.createdAt} onClick={handleClick}>
        {module.title}
      
      </ListGroup.Item>
    </ListGroup>))
    
  
  return <>{displayedModules}</>;
}

export default CourseModules;
