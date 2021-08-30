import * as yup from "yup";

export const userSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email address is required"),
  profileImage: yup.mixed(),
  password: yup.string().min(6).max(12).required("Password is required"),
  passwordConfirm: yup.string().oneOf([yup.ref("password"), null]),
});
