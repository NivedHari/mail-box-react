import React from "react";
import useAuthForm from "../Hooks/useAuthForm";
const AuthForm = () => {
  const {
    isLogin,
    emailInputRef,
    passwordInputRef,
    confirmPasswordInputRef,
    switchAuthModeHandler,
    submitHandler,
  } = useAuthForm();

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

                    {!isLogin && (
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="confirmpassword"
                          ref={confirmPasswordInputRef}
                          placeholder="Confirm Password"
                          className="form-control form-control-lg"
                        />
                      </div>
                    )}

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
