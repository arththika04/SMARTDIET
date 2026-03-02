
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "../styles/auth.css";

const AuthContainer = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="auth-wrapper">
      <div className={`container ${isActive ? "active" : ""}`}>

        {/* LOGIN FORM */}
        <LoginForm />

        {/* REGISTER FORM */}
        <RegisterForm />

        {/* OVERLAY PANEL */}
        <div className="overlay">
          <div className="overlay-panel">
            {!isActive ? (
              <>
                <h1>Hello, Welcome!</h1>
                <p>Don't have an account?</p>
                <button
                  className="ghost"
                  onClick={() => setIsActive(true)}
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <h1>Welcome Back!</h1>
                <p>Already have an account?</p>
                <button
                  className="ghost"
                  onClick={() => setIsActive(false)}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthContainer;