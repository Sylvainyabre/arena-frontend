import { React, useState, useEffect } from "react";
import "./PasswordReset.css";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../stateManagement/reducers/User/passwordResetSlice";
import { useHistory, useParams } from "react-router-dom";
import { setPasswordResetUrl } from "../../api/authUrls";
import { toast } from "react-toastify";

function PasswordReset() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { token, userId } = useParams();
  const passwordResetUrl = setPasswordResetUrl(token, userId);
  const passwordResetState = useSelector((state) => state.passwordReset);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [isReset, setIsReset] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      resetPassword({
        password: password,
        passwordConfirm: passwordConfirm,
        passwordResetUrl: passwordResetUrl,
      })
    ).then((res) => {
      console.log(res)
      if (res.payload.message) {
       
          toast.success(res.payload.message, { autoClose: 15000 });
        
      }
    });
  };
  useEffect(() => {
    setError(passwordResetState.error);
    setIsLoading(passwordResetState.isLoading);
    setIsReset(passwordResetState.isReset);
    if (isReset) {
      history.push("/login");
    }
  }, [
    passwordResetState.error,
    passwordResetState.isLoading,
    passwordResetState.isReset,
    history,
    isReset,
  ]);
  return (
    <div className="password-reset">
      <form className="password-reset-form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Update your password</legend>
          <label htmlFor="new-password">New password</label>
          <input
            type="password"
            name="new-password"
            placeholder="Your new password..."
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error">{error.password}</p>}
          <label htmlFor="new-password-confirm">Confirm password</label>
          <input
            type="password"
            name="new-password-confirm"
            placeholder="Confirm new password..."
            autoComplete="off"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          {error && <p className="error">{error.passwordConfirm}</p>}
        </fieldset>
        {error.message && <p className="error">{error.message}</p>}
        {isLoading ? (
          <h3>Updating...</h3>
        ) : (
          <input type="submit" className="password-update-button" />
        )}
      </form>
    </div>
  );
}

export default PasswordReset;
