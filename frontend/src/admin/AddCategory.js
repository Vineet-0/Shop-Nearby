import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "../admin/helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      })
      .catch((err) => console.log(err));
  };

  const successMessage = () => {
    return (
      <div
        style={{ display: success ? "" : "none" }}
        className="mb-4 max-w-md rounded-md mx-auto text-lg font-bold px-6 py-5 text-lime-600"
        role="alert"
      >
        <h4>Category created successfully</h4>
      </div>
    );
  };

  const warningMessage = () => {
    return (
      <div
        style={{ display: error ? "" : "none" }}
        className="mb-4 max-w-md rounded-md mx-auto text-lg font-bold px-6 py-5 text-red-600"
        role="alert"
      >
        <h4>Failed to create category</h4>
      </div>
    );
  };

  const myCategoryForm = () => {
    return (
      <form className="">
        <div>
          <p className="text-2xl font-bold text-white mb-4">Enter the category</p>
          <input
            type="text"
            className="block border w-full text-[#05445E] border-[#05445E] my-3 px-4 py-2 rounded mb-4"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="For Ex. Summer"
          />
          <button
            onClick={onSubmit}
            className="px-4 py-2 text-white bg-[#05445E] font-bold rounded-md hover:bg-[#75E6DA] hover:text-[#05445E]"
          >
            Create Category
          </button>
        </div>
      </form>
    );
  };

  return (
      <div className="bg-[#189AB4] p-8">
        {successMessage()}
        {warningMessage()}
        {myCategoryForm()}
      </div>
  );
};

export default AddCategory;
