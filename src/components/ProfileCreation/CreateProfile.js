import { React, useState ,useEffect} from "react";
import "./CreateProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { createProfile } from "../../stateManagement/reducers/User/profileSlice";
import {useHistory} from "react-router-dom";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CreateProfile = () => {
  const profileState = useSelector((state) => state.profile);
  const errors = profileState.errors
  const [canRedirect, setCanRedirect] = useState(false)
  const [status, setStatus] = useState("");
  const [bio, setBio] = useState("");
  const dispatch = useDispatch();
  const history = useHistory()
  const data = {
    status: status,
    bio: bio,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProfile(data)).then((res)=>{
        //check if profile created successfully
        //if yes, redirect to dashboard
        if(res.payload.user){
            setCanRedirect(true)
        }
       
    });
  };
  useEffect(()=>{
      if(canRedirect){
       toast.success("Profile created successfully !")
          history.replace("/dashboard")
      }
      
  })
  
  return (
    <div className="profile-creation">
      <form className="form-control" onSubmit={handleSubmit}>
        <fieldset className="profile-creation-fieldset">
          <legend>
            Help others know you more by providing your profile information.
          </legend>
          <label htmlFor="status">Your status</label>
          <input
            type="text"
            placeholder="Your status"
            id="status"
            onChange={(e) => setStatus(e.target.value)}
          />
          {errors.status&&<p className ="error">{errors.status}</p>}
          <label htmlFor="bio">Your bio</label>
          <textarea
            placeholder="Your biography here."
            id="bio"
            onChange={(e) => setBio(e.target.value)}
          />
          {errors.bio&&<p className ="error">{errors.bio}</p>}
          <input type="submit" />
        </fieldset>
      </form>
    </div>
  );
};

export default CreateProfile;
