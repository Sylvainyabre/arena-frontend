import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Register.css";
import { registerUser } from "../../stateManagement/reducers/User/registrationSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";



function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const registrationErrors = useSelector((state) => state.register.errors);
  const registrationStatus = useSelector(
    (state) => state.register.isRegistered
  );
  const isLoading = useSelector((state) => state.register.isLoading);
  const [errors, setErrors] = useState(registrationErrors);
  const [isRegistered, setIsRegistered] = useState(registrationStatus);

  const dispatch = useDispatch();
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
    };

    dispatch(registerUser(newUser)).then((res)=>{
      if (res.payload) {
        if (res.payload.hasOwnProperty("title")) {
          toast.success("Account created successfully !", { autoClose: 15000 });
        } else if (res.payload.payload.message) {
          toast.error(res.payload.payload.message);
        }
      }
    })
   
  };

  useEffect(() => {
    setErrors(registrationErrors);
    setIsRegistered(registrationStatus);
  }, [registrationErrors, errors, registrationStatus, isRegistered]);
  if(isRegistered){
    return <Redirect to = '/login'/>
  }
  return (
    <div className="container signup-container">
      <form className="signup_form form-control " onSubmit={handleSubmit}>
        <fieldset className="registration-fieldset">
          <legend className="registration-legend">
            <h1>JOIN US TODAY</h1>
          </legend>
          <label htmlFor="firstName">First name:</label>
          <input
            type="text"
            name="firstName"
            placeholder="Given name..."
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}

          <label htmlFor="lastName">Last name:</label>
          <input
            type="text"
            name="lastName"
            placeholder="Family name..."
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}

          <label htmlFor="email">Email address:</label>
          <input
            type="email"
            name="email"
            placeholder="Email address..."
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password..."
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <label htmlFor="passwordConfirm">Password confirmation:</label>
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Confirm your password..."
            onChange={(e) => setPasswordConfirm(e.target.value)}
            autoComplete="on"
          />
          {errors.passwordConfirm && (
            <p className="error">{errors.passwordConfirm}</p>
          )}
        </fieldset>
        {!isLoading && <input type="submit" disabled={isRegistered} />}
        <hr></hr>
        <small>
          Already have an account? <Link to="/login">Sign in </Link>
        </small>
      </form>
    </div>
  );
}

export default RegistrationForm;
