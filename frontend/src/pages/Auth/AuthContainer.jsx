import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import OverlayPanel from "./OverlayPanel";
import "./auth.css";

export default function AuthContainer() {
  // Default state: overlay LEFT + login visible RIGHT
  const [isActive, setIsActive] = useState(false); // true => Register mode

  return (
    <div className="auth-page">
      <div className={`container ${isActive ? "active" : ""}`}>
        {/* White form area */}
        <div className="forms">
          <div className="form-panel login-panel">
            <LoginForm onGoRegister={() => setIsActive(true)} />
          </div>

          <div className="form-panel register-panel">
            <RegisterForm onGoLogin={() => setIsActive(false)} />
          </div>
        </div>

        {/* Blue overlay (slides left <-> right) */}
        <OverlayPanel isActive={isActive} onToggle={() => setIsActive((p) => !p)} />
      </div>
    </div>
  );
}