import { Link } from "react-router-dom";
import UseInput from "../../hooks/use-input";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import { loginActions } from "../../store/store";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

// Sign In component
function SignIn() {
  const dispatch = useDispatch();

  // redux action change state login
  const userlogin = (user) => {
    dispatch(loginActions.ON_LOGIN(user));
  };

  // Data for validate input using custom hook UseInput
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

  // Data of all user have been sign up
  const data = localStorage.getItem("userArr");
  const userArr = data ? JSON.parse(data) : [];

  const loginArr = [];

  let formIsValid = false;

  // If all inputs are valid
  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  // Function change to Sign Up
  const navigate = useNavigate();
  function gotoShop() {
    navigate("/shop");
    window.scrollTo(0, 0);
  }

  // Function handle submit form sign in
  const submitHandler = (event) => {
    event.preventDefault();

    let checkEmail = 0;
    let checkPassword = 0;

    setEmailIsTouched(true);
    setPasswordIsTouched(true);

    // If one of the input is invalid then return
    if (!enteredEmailIsValid || !enteredPasswordIsValid) {
      return;
    }

    // Check email input have been sign up or not
    for (let i = 0; i < userArr.length; i++) {
      if (userArr[i].email === enteredEmail) {
        checkEmail = 1;
        break;
      }
    }

    // If not sign up then alert and return
    if (checkEmail === 0) {
      resetPassword();
      Swal.fire({
        icon: "error",
        title: "Your email is not sign up yet!",
        text: "Please sign up!",
      });
      return;
    }

    // Check the email and password input from data user and if right then sign in
    if (formIsValid) {
      for (let i = 0; i < userArr.length; i++) {
        if (
          userArr[i].email === enteredEmail &&
          userArr[i].password === enteredPassword
        ) {
          checkPassword = 1;
          Swal.fire(
            "Successfully Sign In!",
            "Now You Can Shopping!",
            "success"
          );

          const userInput = {
            name: userArr[i].name,
            email: userArr[i].email,
            password: userArr[i].password,
            phone: userArr[i].phone,
          };
          loginArr.push(userInput);
          userlogin(loginArr);
          localStorage.setItem("loginArr", JSON.stringify(loginArr));
          break;
        }
      }

      // If password wrong alert
      if (checkPassword === 0) {
        resetPassword();
        Swal.fire({
          icon: "error",
          title: "Your password is wrong!",
          text: "Please enter again!",
        });
        return;
      }
    }

    // Reset form and change to Shop page
    resetEmail();
    resetPassword();
    gotoShop();
  };

  return (
    <div className="sign-in">
      <form onSubmit={submitHandler}>
        <h1>Sign In</h1>
        <div className="invalid-form">
          {emailInputHasError && <p>Email must have @.</p>}
          {passwordInputHasError && <p>Password must be longer than 8.</p>}
        </div>
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
        <button type="submit">Sign In</button>
        <div className="sign-up-change">
          <p>Create an account?</p>
          <Link to="/login/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
