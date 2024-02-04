import React from "react";
import { useRef } from "react";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef?.current?.value || "";

    if (enteredPassword !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

    const user = {
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: confirmPassword,
    };
    console.log(user);

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
  };

  return (
    <section className="vh-100 ">
      <div className="mask d-flex align-items-center h-100 ">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-10 col-md-9 col-lg-7 col-xl-5">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form onSubmit={submitHandler}>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="email"
                        ref={emailInputRef}
                        className="form-control form-control-lg"
                      />
                      <label className="form-label">Your Email</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="password"
                        ref={passwordInputRef}
                        className="form-control form-control-lg"
                      />
                      <label className="form-label">Password</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="confirmpassword"
                        ref={confirmPasswordInputRef}
                        className="form-control form-control-lg"
                      />
                      <label className="form-label">Repeat your password</label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button className="btn btn-primary btn-block btn-lg gradient-custom-4 text-body">
                        Sign up
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account?{" "}
                      <a href="#!" className="fw-bold text-body">
                        <u>Login here</u>
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
