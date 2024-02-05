import React from "react";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const AuthForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef?.current?.value || "";

    if (!isLogin && (enteredPassword !== confirmPassword)) {
      alert("Passwords do not match");
      return;
    }

    const user = {
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: confirmPassword,
    };
    console.log(user);

    if (isLogin) {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVIPWCXjtwe-bVGWsTdJ8kxBLenB7FD6k",
          {
            method: "POST",
            body: JSON.stringify({
              email:enteredEmail,
              password:enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("login Failed");
        }
        const data = await response.json();
        // const cleanedMail = `${data.email.replace(/\.|@/g, "")}`;
        dispatch(authActions.login({ token: data.idToken, email: data.email}));
        history.replace('/inbox');

        return data;
        
      } catch (error) {
        alert(error.message);
      }
    } else {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBVIPWCXjtwe-bVGWsTdJ8kxBLenB7FD6k",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Sign Up Failed");
        }

        const data = await response.json();
        console.log("Signup successful:", data);
      } catch (error) {
        console.error("Signup error:", error);
        alert(error.message);
      }
    }
  };

  return (
    <section className="mt-5 ">
      <div className="mask d-flex align-items-center h-100 ">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-10 col-md-9 col-lg-7 col-xl-5">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    {isLogin ? "Login" : "Sign Up"}
                  </h2>

                  <form onSubmit={submitHandler}>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="email"
                        ref={emailInputRef}
                        placeholder="Email"
                        className="form-control form-control-lg"
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="password"
                        ref={passwordInputRef}
                        placeholder="Password"
                        className="form-control form-control-lg"
                      />
                    </div>

                    {!isLogin && (<div className="form-outline mb-4">
                      <input
                        type="password"
                        id="confirmpassword"
                        ref={confirmPasswordInputRef}
                        placeholder="Confirm Password"
                        className="form-control form-control-lg"
                      />
                    </div>)}

                    <div className="d-flex justify-content-center">
                      <button className="btn btn-primary btn-block btn-lg  ">
                        {isLogin ? "Login" : "Create Account"}
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      {isLogin
                        ? "Don't have an account?"
                        : "already have an account?"}{" "}
                      <a
                        href="#!"
                        className="fw-bold text-body"
                        onClick={switchAuthModeHandler}
                      >
                        <u>{isLogin ? "Sign up" : "Login"}</u>
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
