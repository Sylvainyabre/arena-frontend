import React, { useEffect } from "react";
import "./CourseCard.css";
import { useDispatch } from "react-redux";
import { setCourse } from "../../stateManagement/reducers/Course/courseSlice";
import { useHistory } from "react-router";
import { Card } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function CourseCard({ course }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    const courseLink = `/course/${course._id}/view`;
    dispatch(setCourse(course));
    history.push(courseLink, course);
  };
  useEffect(() => {
    dispatch(setCourse(course));
  }, []);

  return (
    <Col>
      <Card className="card" style={{ height: "500px", width:"350px" }}>
        <Card.Img variant="top" className="course-image" src={course.imageURL} />
        <Card.Body>
          <Card.Title>{course.title}</Card.Title>

          <hr />
          <Card.Text>{course.overview}</Card.Text>
          <button onClick={handleClick} className="btn btn-primary">
           Go to course
         </button>
        </Card.Body>
      </Card>
    </Col>
    // <div className="card container">
    //   <div className="card-body">
    //     <h5 className="card-title">{course.title}</h5>
    //     <hr />
    //     <p className="card-text">{course.overview}</p>

    //     <button onClick={handleClick} className="btn btn-primary">
    //       Go to course
    //     </button>
    //     <hr />
    //     <small className="module-number text-muted">
    //       {course.modules.length} modules
    //     </small>
    //   </div>
    // </div>
  );
}

export default CourseCard;
