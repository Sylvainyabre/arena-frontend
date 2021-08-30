import { API } from "./index";

const loginUrl = "/api/auth/login";

export const userLogin = async ({ email, password }) => {
  try {
    const res = await API.post(loginUrl, { email, password });
    const responseData = res?.data;
    return responseData;
  } catch (err) {
    // return JSON.stringify(err )
    console.log(err.message);
  }
};

const registrationUrl = "/api/auth/register";
export const RegisterUser = async (data) => {
  try {
    await API.post(registrationUrl, data);
  } catch (err) {
     
  }
};
