import { useState, useEffect, React } from "react";
import "./PasswordResetRequest.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { requestPassword } from "../../stateManagement/reducers/User/passwordRequestSlice";

function PasswordResetRequest() {
  const dispatch = useDispatch();
  const history = useHistory();
  const passwordRequestState = useSelector((state) => state.passwordRequest);
  const [error, setError] = useState(passwordRequestState.error);
  const [isLoading, setIsLoading] = useState(passwordRequestState.isLoading);
  const [isRequested, setIsRequested] = useState(
    passwordRequestState.isRequested
  );
  
  const [email,setEmail] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(requestPassword({email:email}));
  };
  useEffect(() => {
    setError(passwordRequestState.error);
    setIsLoading(passwordRequestState.isLoading);
    setIsRequested(passwordRequestState.isRequested);
    if (isRequested) {
      history.push('/password/requested');
    }
  }, [
    passwordRequestState.error,
    passwordRequestState.isLoading,
    passwordRequestState.isRequested,
    history,
    isRequested,
  ]);
  
  return (
    <div className="password-request">
      <form className="password-request-form" onSubmit={handleSubmit}>
        <fieldset className="password-request-fieldset">
          <legend className="password-request-legend">
            
            Request to update your password.
          </legend>
          <label htmlFor="email" className="email-label">
            Email address:
          </label>
          <input
            type="email"
            name="email"
            className="reset-email-input"
            placeholder="Email address..."
            onChange={(e)=>setEmail(e.target.value)}
          />
           {error && <p className ='error'>{error.message}</p>}
          {isLoading?<h3>Sending email</h3>:<input type="submit" className="send-request" />}
         
          
        </fieldset>
      </form>
    </div>
  );
}

export default PasswordResetRequest;
