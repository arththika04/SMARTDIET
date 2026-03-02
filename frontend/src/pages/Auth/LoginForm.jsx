import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../../components/Spinner.jsx";
import { toast } from "react-toastify";
import { FaGoogle, FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const schema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginForm({ onGoRegister }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  return (
    <div className="form-inner">
      <h2 className="title">Login</h2>
      <p className="subtitle">Sign in to continue</p>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const res = await api.post("/api/auth/login", values);

            // Backend sends { success, token, user }
            login(res.data.token, res.data.user);

            toast.success("Login successful!");
            navigate("/dashboard");
          } catch (err) {
            const msg =
              err?.response?.data?.message ||
              err?.response?.data?.error ||
              "Login failed";
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
        }) => (
          <form onSubmit={handleSubmit} className="auth-form">
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

            <div className="field">
              <div className="password-wrap">
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <button
                  type="button"
                  className="toggle"
                  onClick={() => setShow((p) => !p)}
                >
                  {show ? "Hide" : "Show"}
                </button>
              </div>
              {touched.password && errors.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>

            <div className="row">
              <button type="button" className="link" onClick={() => toast.info("Forgot password page later ✅")}>
                Forgot password?
              </button>
            </div>

            <button className="primary-btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="btn-loading">
                  <Spinner size={18} /> Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>

            <div className="divider"><span>or login with</span></div>

            <div className="social">
              <button type="button" className="social-btn" aria-label="Google">
                <FaGoogle />
              </button>
              <button type="button" className="social-btn" aria-label="Facebook">
                <FaFacebookF />
              </button>
              <button type="button" className="social-btn" aria-label="GitHub">
                <FaGithub />
              </button>
              <button type="button" className="social-btn" aria-label="LinkedIn">
                <FaLinkedinIn />
              </button>
            </div>

            <p className="switch">
              Don&apos;t have an account?{" "}
              <button type="button" className="link" onClick={onGoRegister}>
                Register
              </button>
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
}