import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import "./LoginForm.css";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../stateManagement/reducers/User/loginSlice";
import { setCurrentUser } from "../../stateManagement/reducers/User/loginSlice";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((state) => state.login.errors);
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const isLoading = useSelector((state) => state.login.isLoading);
  //const courses = useSelector((state)=>state.course.courses)

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin({ email, password })).then((res) =>
      setCurrentUser(res.payload)
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  }, [history, isAuthenticated]);

  return (
    <div className="container login-container">
      <form className="form-control login-form" onSubmit={handleSubmit}>
        <fieldset className="login-fieldset">
          <legend className="login-legend"> Log in to start</legend>

          <label htmlFor="email" className="email-label">
            Email address:
          </label>
          <input
            type="email"
            name="email"
            className="email-input"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address..."
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <label htmlFor="password" className="password-label">
            Password:
          </label>
          <input
            type="password"
            name="password"
            className="password-input"
            placeholder="Your password..."
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </fieldset>

        {isLoading ? (
          <p>Logging you in...</p>
        ) : (
          <input type="submit" className="login-button" />
        )}
      </form>
      <hr />
      <small>
        Don't have an account? <Link to="/register">Register </Link>
      </small>

      <small>
        Forgot password? <Link to="/password/reset">Reset password</Link>
      </small>
    </div>
  );
}

export default LoginForm;
