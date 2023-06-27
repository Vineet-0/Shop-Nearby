import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const Signin = () => {
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
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
            />

            <button
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
      {signInform()}
    </Base>
  );
};

export default Signin;
