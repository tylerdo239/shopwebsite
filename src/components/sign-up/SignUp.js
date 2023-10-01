import { Link, useNavigate } from "react-router-dom";
import UseInput from "../../hooks/use-input";
import "./SignUp.css";
import Swal from "sweetalert2";

// Sign up coponent
function SignUp() {
  // Data for validate input using custom hook UseInput
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueInputChange: nameInputChange,
    valueInputBlur: nameInputBlur,
    setIsTouched: setNameIsTouched,
    reset: resetnName,
  } = UseInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueInputChange: emailInputChange,
    valueInputBlur: emailInputBlur,
    setIsTouched: setEmailIsTouched,
    reset: resetEmail,
  } = UseInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueInputChange: passwordInputChange,
    valueInputBlur: passwordInputBlur,
    setIsTouched: setPasswordIsTouched,
    reset: resetPassword,
  } = UseInput((value) => value.length > 8);

  const {
    value: enteredPhone,
    isValid: enteredPhoneIsValid,
    hasError: phoneInputHasError,
    valueInputChange: phoneInputChange,
    valueInputBlur: phoneInputBlur,
    setIsTouched: setPhoneIsTouched,
    reset: resetPhone,
  } = UseInput((value) => !isNaN(value) && value.trim() !== "");

  // Data of all user have been sign up
  const data = localStorage.getItem("userArr");
  const userArr = data ? JSON.parse(data) : [];

  let formIsValid = false;

  // If all inputs are valid
  if (
    enteredNameIsValid &&
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    enteredPhoneIsValid
  ) {
    formIsValid = true;
  }

  // Function change to Sign In
  const navigate = useNavigate();
  function gotoSignin() {
    navigate("/login/signin");
    window.scrollTo(0, 0);
  }

  // Function handle submit form sign up
  const submitHandler = (event) => {
    event.preventDefault();

    setNameIsTouched(true);
    setEmailIsTouched(true);
    setPasswordIsTouched(true);
    setPhoneIsTouched(true);

    // If one of the input is invalid then return
    if (
      !enteredNameIsValid ||
      !enteredEmailIsValid ||
      !enteredPasswordIsValid ||
      !enteredPhoneIsValid
    ) {
      return;
    }

    // Check the emaile of the user use to sign up is available or not
    for (let i = 0; i < userArr.length; i++) {
      if (userArr[i].email === enteredEmail) {
        Swal.fire({
          icon: "error",
          title: "Your email is not available",
          text: "Please enter another email",
        });
        resetEmail();
        return;
      }
    }

    // If all is valid then put data to user data
    if (formIsValid) {
      const userInput = {
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
        phone: enteredPhone,
      };

      userArr.push(userInput);
      localStorage.setItem("userArr", JSON.stringify(userArr));
    }

    // Reset form and change to Sign In
    resetnName();
    resetEmail();
    resetPassword();
    resetPhone();
    Swal.fire("Sucessfully Sign Up!", "Now You Can Sign In!", "success");
    gotoSignin();
  };

  return (
    <div className="sign-up">
      <form>
        <h1>Sign Up</h1>
        <div className="invalid-form">
          {nameInputHasError && <p>Name must not be empty.</p>}
          {emailInputHasError && <p>Email must have @.</p>}
          {passwordInputHasError && <p>Password must be longer than 8.</p>}
          {phoneInputHasError && <p>Phone must be a number.</p>}
        </div>
        <input
          className={nameInputHasError ? "input-error" : ""}
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Full Name"
          value={enteredName}
          onChange={nameInputChange}
          onBlur={nameInputBlur}
        />
        <input
          className={emailInputHasError ? "input-error" : ""}
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={enteredEmail}
          onChange={emailInputChange}
          onBlur={emailInputBlur}
        />
        <input
          className={passwordInputHasError ? "input-error" : ""}
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={enteredPassword}
          onChange={passwordInputChange}
          onBlur={passwordInputBlur}
        />
        <input
          className={phoneInputHasError ? "input-error" : ""}
          type="tel"
          id="phone"
          name="phone"
          placeholder="Phone"
          value={enteredPhone}
          onChange={phoneInputChange}
          onBlur={phoneInputBlur}
        />
        <button type="submit" onClick={submitHandler}>
          Sign Up
        </button>
        <div className="sign-in-change">
          <p>Login?</p>
          <Link to="/login/signin">Click</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
