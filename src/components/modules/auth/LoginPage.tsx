"use client";
import { useEffect } from "react";
// import "../../../styles/auth.style.css";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
// import LoginForm from "./LoginForm";
// import RegisterForm from "./RegisterForm";
import"@/styles/auth.style.css";

const LoginPage = () => {
  // toggle state
  useEffect(() => {
    const container: any = document.getElementById("container");
    const registerBtn: any = document.getElementById("register");
    const loginBtn: any = document.getElementById("login");

    // Add event listeners
    registerBtn.addEventListener("click", () => {
      container.classList.add("active");
    });

    loginBtn.addEventListener("click", () => {
      container.classList.remove("active");
    });

    // Cleanup to remove event listeners when component unmounts
    return () => {
      registerBtn.removeEventListener("click", () => {
        container.classList.add("active");
      });

      loginBtn.removeEventListener("click", () => {
        container.classList.remove("active");
      });
    };
  }, []);

  return (
    <div className="flex justify-center items-center flex-col h-[80vh] rounded-lg shadow-lg">
      <div className="container" id="container">
        <div className="form-container sign-up">
          <RegisterForm />
        </div>
        <div className="form-container sign-in">
          <LoginForm />
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="hide" id="login">
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              <button className="hide" id="register">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;