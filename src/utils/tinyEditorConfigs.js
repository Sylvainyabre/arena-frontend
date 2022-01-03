import { fileUploadUrl } from "../api/courseUrls";
import { custom_image_upload_handler } from "./tinyUploadHandler";


const tinyPlugins = [
  "advlist autolink lists link charmap print preview anchor",
  "searchreplace visualblocks code fullscreen",
  "insertdatetime media table paste code wordcount pagebreak codesample image imagetools",
  "textcolor",
  "emoticons",
];

const tinyTools =
  "undo redo | formatselect | " +
  "bold italic | alignleft aligncenter " +
  "alignright alignjustify | bullist numlist outdent indent | Underline" +
  "removeformat | codesample | image imagetools | forecolor backcolor | insertfile | media | emoticons | table | styleselect";

  export const tinyInit = {
          height: 500,
          menubar: true,
          plugins:tinyPlugins,
          toolbar:tinyTools,
          /* without images_upload_url set, Upload tab won't show up*/
          images_upload_url: fileUploadUrl,
          //images_upload_base_path:fileUploadUrl,
          /* we override default upload handler to simulate successful upload*/
          images_upload_handler: custom_image_upload_handler,
          image_class_list: [
            { title: "uploaded_image", value: "uploaded_image" },
          ],
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px ;} span {display: inline-block;}"
        }
