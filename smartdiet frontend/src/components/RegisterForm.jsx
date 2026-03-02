
import { useState } from "react";
import { registerUser } from "../services/authService";

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await registerUser(form);
      alert("Registered Successfully!");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="form-container register-container">
      <form onSubmit={handleSubmit}>
        <h2>Registration</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;