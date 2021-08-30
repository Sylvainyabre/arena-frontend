export const allCoursesUrl = "/api/courses/all"; //GET
export const courseUrl = (courseId) => `/api/courses/course/${courseId}`; //GET
export const courseUpdateUrl = (courseId) => `/api/courses/update/${courseId}`; //PUT
export const courseDeleteUrl = (courseId) => `/api/courses/delete/${courseId}`; //DELETE
export const courseCreationUrl = "/api/courses/course/new"; //POST
export const courseEnrollmentUrl = (courseId) =>
  `/api/courses/enrol/${courseId}`; //POST
export const courseDropUrl = (courseId) =>
  `/pi/courses/course/drop/${courseId}`; //POST
export const moduleCreationUrl = (courseId) =>
  `api/courses/modules/new/${courseId}`; //POST
export const moduleUpdateUrl = (courseId, moduleId) =>
  `/api/courses/modules/update/${courseId}/${moduleId}`;
  export const moduleDeleteUrl = (courseId, moduleId) =>
  `/api/courses/modules/delete/${courseId}/${moduleId}`;
