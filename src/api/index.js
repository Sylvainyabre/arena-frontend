import axios from "axios";

export const API = axios.create({
  baseURL: " https://brain-arena.herokuapp.com",
});
export const UPLOAD_API = axios.create({
  baseURL: " https://brain-arena.herokuapp.com",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// UPLOAD_API.interceptors.request.use(function (config) {
//   config.headers.ContentType = "multipart/form-data";
//   console.log(config)
//   return config;
// });

// export default UPLOAD_API;