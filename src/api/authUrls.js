//related to user authentication
export const loginUrl = '/api/auth/login';
export const registrationUrl = '/api/auth/register';
export const logoutUrl = '/api/auth/logout';
export const accountDeleteUrl = '/api/auth/delete/:user_id';
//related to password update
export const passwordRequestUrl = '/api/auth/password/forgotten';
export  function setPasswordResetUrl(token,userId){
  return `/api/auth/password/reset/${token}/${userId}`
}
//related to user profile
export const profileCreationUrl = '/api/profile/new';
export const profileUrl = '/api/profile/user/:user_id';
export const profileEducationCreationUrl = '/api/profile/education/new';
export const profileEducationDeleteUrl = '/api/profile/education/:ed_id';
export const profileDeleteUrl = '/api/profile/delete';
export const profileAllUrl = '/api/profile/all';
export const currentUserProfileUrl = '/api/profile/'

