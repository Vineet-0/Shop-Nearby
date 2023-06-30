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
        <button className="border-2 p-2 text-slate-600 mb-3 font-bold rounded-md border-slate-500 hover:bg-slate-600 hover:text-white">
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
          <p className="text-lg text-zinc-800">Enter the category</p>
          <input
            type="text"
            className="block border w-full  border-grey-light my-3 p-2 rounded mb-4"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="For Ex. Summer"
          />
          <button
            onClick={onSubmit}
            className="border-2 p-2 text-slate-600 mb-4 font-bold rounded-md border-slate-500 hover:bg-slate-600 hover:text-white"
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
      className=" py-5 px-3 w-3/4 mx-auto mt-8 bg-slate-600"
    >
      <div className="p-4 bg-white">
        {successMessage()}
        {warningMessage()}
        {myCategoryForm()}
        {goBack()}
      </div>
    </Base>
  );
};

export default UpdateCategory;
