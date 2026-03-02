import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import "./styles/auth.css";

function App() {
  return (
    <div className="auth-wrapper">
      <div className="container">
        <div className="form-container">
          <LoginForm />
        </div>
        <div className="login-container">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

export default App;
