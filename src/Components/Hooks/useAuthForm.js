import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { authActions } from "../../store/auth-slice";

const useAuthForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
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
    const confirmPassword =
      confirmPasswordInputRef?.current?.value || "";

    if (!isLogin && enteredPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const endpoint = isLogin
        ? "signInWithPassword"
        : "signUp";

      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:${endpoint}?key=AIzaSyBVIPWCXjtwe-bVGWsTdJ8kxBLenB7FD6k`,
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
        throw new Error(isLogin ? "Login Failed" : "Sign Up Failed");
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (isLogin) {
        dispatch(authActions.login({ token: data.idToken, email: data.email }));
        history.replace("/inbox");
      } else {
        console.log("Sign up successful:", data);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      alert(error.message);
    }
  };

  return {
    isLogin,
    emailInputRef,
    passwordInputRef,
    confirmPasswordInputRef,
    switchAuthModeHandler,
    submitHandler,
  };
};

export default useAuthForm;
