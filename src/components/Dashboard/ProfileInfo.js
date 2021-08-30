import React from "react";
import { Link } from "react-router-dom";
import CreatedCourse from "./CreatedCourse";


function ProfileInfo({user,courses,profile}) {
 
 
  const userCourses = courses.filter((course) => course.author === user._id);
  const isAdmin = (user) =>{
    return user.role === "admin"
  }
 
  const coursesDisplays =
    userCourses.length > 0 ? (
      userCourses.map((course) => (
        <CreatedCourse
          key={course.createdAt}
          course={course}
          courses={courses}
        />
      ))
    ) : (
      <p>No courses created</p>
    );
  return (
    <div className="dashboard">
      <div className="profile-image">
        <img
          src={profile.user.avatar}
          className="rounded-circle"
          alt="user email avatar"
        />
      </div>
      <div className="user-info">
        <h4>
          {profile.user.firstName} {profile.user.lastName}
        </h4>
        <hr />
        {isAdmin(user)&&<Link to ="/course/create" className ="admin-course-button">Create course</Link>}
        <hr />
        {profile.user.enrollments.length > 0 ? (
          <div className="course-enrollments">
            <h4>Courses you are enrolled in</h4>
          </div>
        ) : (
          <h5 className="text-muted">
            Your registered courses will appear here
          </h5>
        )}
        <hr />
        <div className="courses-created">
          <h4 className="text-muted">Courses you have created</h4>

          {coursesDisplays}
        </div>
        <hr />
        <p className="text-muted">Status: {profile.status}</p>
        <p className="text-muted">Biography: {profile.bio}</p>
      </div>
    </div>
  );
}

export default ProfileInfo;
