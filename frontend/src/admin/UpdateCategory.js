import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link, useParams } from "react-router-dom";
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../admin/helper/adminapicall";

const UpdateCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();
  const { categoryId } = useParams();

  const goBack = () => {
    return (
      <div className="mt-5 mx-40">
        <button className="px-4 py-2 text-white bg-[#05445E] mb-3 font-bold rounded-md hover:bg-[#189AB4]">
          <Link to="/admin/dashboard">Admin Home</Link>
        </button>
      </div>
    );
  };

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setName(data.name);
      }
    });
  };

  useEffect(() => {
    preload(categoryId);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    updateCategory(categoryId, user._id, token, {name})
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setName(name);
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
        <h4>Category updated successfully</h4>
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
        <h4>Failed to update category</h4>
      </div>
    );
  };

  const myCategoryForm = () => {
    return (
      <form className="mx-40">
        <div>
          <p className="text-2xl font-bold text-[#05445E] mb-4">Enter the category</p>
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
            className="px-4 py-2 text-white bg-[#05445E] font-bold rounded-md hover:bg-[#189AB4]"
          >
            Update Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Create a category here"
      description="Add an category here"
      className="p-8 bg-[#189AB4] mx-auto w-3/4 mt-8 mb-4 rounded-md"
    >
      <div className="p-4 bg-[#75E6DA] rounded-md">
        {successMessage()}
        {warningMessage()}
        {myCategoryForm()}
        {goBack()}
      </div>
    </Base>
  );
};

export default UpdateCategory;
