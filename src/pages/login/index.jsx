import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import login from "@/assets/images/logos/login.png";

import {
  initialValues,
  validationSchema,
  setSession
} from "./login-utils";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formikRef = useRef();

  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    formikRef.current?.resetForm();
  }, []);

  const handleLogin = async ({
    values,
    setSubmitting
  }) => {
    try {
      setLoading(true);
      setLoginError(null);

      // ✅ LOG VALUES
      console.log("Form Values:", values);

      // TEMP MOCK API (since loginApi missing)
      const response = {
        token: "dummy-token",
        user: { email: values.email }
      };

      console.log("API Response:", response);

      setSession(response);

      navigate("/dashboard");

    } catch (error) {
      const message =
        error?.message || error?.toString() || "Login failed";

      console.log("Login Error:", error);

      setLoginError(message);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };
  return (
    <div className="login-container flex items-center justify-center min-h-screen">
      <div className="login-card">
        <img src={login} alt="logo" className="logo" />

        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) =>
            handleLogin({
              values,
              ...actions,
              setLoading,
              setLoginError,
              navigate,
              dispatch
            })
          }
        >
          {(formik) => (
            <Form autoComplete="off">
              <div className="form-group mb-[10px]">
                <label>Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="enter email here"
                  disabled={loading}
                  className="mt-[5px]"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="form-group">
                <label>Password</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="enter password here"
                  disabled={loading}
                  className="mt-[5px]"
                />
                <ErrorMessage name="password" component="div" className="error" />
              </div>

              {loginError && (
                <div className="error mt-[10px]">{loginError}</div>
              )}

              <button
                type="submit"
                className="login-btn mt-[20px]"
                disabled={!(formik.isValid && formik.dirty) || loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="forgot-password">Forgot Password?</p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;