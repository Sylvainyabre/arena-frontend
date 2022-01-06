import { fileUploadUrl } from "./courseUrls";
import { UPLOAD_API } from ".";


export const uploadCourseImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);

  try {
     
    const res = await UPLOAD_API.post(fileUploadUrl, formData);

    return {imagePath: res.data.imagePath};
  } catch (err) {
   
    return {error:err.message}
    
  }
};
