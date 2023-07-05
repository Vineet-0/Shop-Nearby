import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper/index";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((err) => console.log("Error in signup"));
  };

  const signUpform = () => {
    return (
      <>
        <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-gray-600 px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-white text-3xl text-center">Sign up</h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="fullname"
              placeholder="Full Name"
              onChange={handleChange("name")}
              value={name}
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              onChange={handleChange("email")}
              value={email}
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              onChange={handleChange("password")}
              value={password}
            />

            <button
              type="submit"
              onClick={onSubmit}
              className="w-full text-center py-3 rounded bg-gray-800 text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Create Account
            </button>
          </div>

          <div className="text-grey-dark mt-6">
            Already have an account?
            <Link
              to="/signin"
              className="no-underline border-b border-blue mx-2 text-blue"
            >
              Log in
            </Link>
          </div>
        </div>
      </>
    );
  };

  const successMessage = () => {
    return (
      <div
        style={{ display: success ? "" : "none" }}
        className="mb-4 max-w-md rounded-md mx-auto bg-green-200 px-6 py-5 text-base text-lime-900"
        role="alert"
      >
        New account was created successfully.
        <p>
          Please
          <Link to="/signin" className="underline mx-2 text-blue-600">
            Login Here
          </Link>
        </p>
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

  return (
    <Base title="SignUp page" description="A page for user to signup !">
      {successMessage()}
      {errorMessage()}
      {signUpform()}
    </Base>
  );
};

export default Signup;
