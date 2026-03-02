import { useMemo, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import api from "../../api/axios";   // ✅ Correct path
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import {
  FaGoogle,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

const schema = Yup.object({
  username: Yup.string()
    .min(3, "Min 3 characters")
    .max(20, "Max 20 characters")
    .required("Username is required"),

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Min 6 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

function getStrength(password) {
  let score = 0;
  if (password.length >= 6) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

export default function RegisterForm({ onGoLogin }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-inner">
      <h2 className="title">Registration</h2>
      <p className="subtitle">Create your account</p>

      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await api.post("/api/auth/register", values);

            toast.success("Registered successfully! Please login.");
            resetForm();
            onGoLogin();
          } catch (err) {
            const msg =
              err?.response?.data?.message ||
              "Registration failed";
            toast.error(msg);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => {
          const strength = useMemo(
            () => getStrength(values.password),
            [values.password]
          );

          return (
            <form onSubmit={handleSubmit} className="auth-form">
              {/* Username */}
              <div className="field">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.username && errors.username && (
                  <div className="error">{errors.username}</div>
                )}
              </div>

              {/* Email */}
              <div className="field">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email && (
                  <div className="error">{errors.email}</div>
                )}
              </div>

              {/* Password */}
              <div className="field">
                <div className="password-wrap">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <button
                    type="button"
                    className="toggle"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {touched.password && errors.password && (
                  <div className="error">{errors.password}</div>
                )}

                {/* Password Strength */}
                <div className="strength">
                  <div className={`bar s-${strength}`} />
                  <span className="strength-text">
                    {strength <= 1
                      ? "Weak"
                      : strength === 2
                      ? "Medium"
                      : strength === 3
                      ? "Strong"
                      : "Very Strong"}
                  </span>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="field">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.confirmPassword &&
                  errors.confirmPassword && (
                    <div className="error">
                      {errors.confirmPassword}
                    </div>
                  )}
              </div>

              {/* Submit Button */}
              <button
                className="primary-btn"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="btn-loading">
                    <Spinner size={18} /> Creating...
                  </span>
                ) : (
                  "Register"
                )}
              </button>

              <div className="divider">
                <span>or signup with</span>
              </div>

              {/* Social Icons */}
              <div className="social">
                <button type="button" className="social-btn">
                  <FaGoogle />
                </button>
                <button type="button" className="social-btn">
                  <FaFacebookF />
                </button>
                <button type="button" className="social-btn">
                  <FaGithub />
                </button>
                <button type="button" className="social-btn">
                  <FaLinkedinIn />
                </button>
              </div>

              <p className="switch">
                Already have an account?{" "}
                <button
                  type="button"
                  className="link"
                  onClick={onGoLogin}
                >
                  Login
                </button>
              </p>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}