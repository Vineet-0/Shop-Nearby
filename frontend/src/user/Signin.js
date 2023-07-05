import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Navigate } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper/index";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch((err) => console.log("signin request failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Navigate to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      <div
        style={{ display: loading ? "" : "none" }}
        className="mb-4 max-w-md rounded-md mx-auto bg-green-200 px-6 py-5 text-base text-lime-900"
        role="alert"
      >
        <h2>Loading...</h2>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        style={{ display: error ? "" : "none" }}
        className="mb-4 max-w-md rounded-md mx-auto bg-red-200 px-6 py-5 text-base text-red-900"
        role="alert"
      >
        {error}
      </div>
    );
  };

  const signInform = () => {
    return (
      <>
        <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-gray-600 px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-white text-3xl text-center">Sign in</h1>

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange("email")}
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange("password")}
            />

            <button
              onClick={onSubmit}
              type="submit"
              className="w-full text-center py-3 rounded bg-gray-800 text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Sign in
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <Base title="SignIn page" description="A page for user to signin !">
      {loadingMessage()}
      {errorMessage()}
      {signInform()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;
