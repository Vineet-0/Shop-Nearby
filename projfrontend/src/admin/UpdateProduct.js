import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  getCategories,
  getProduct,
  updateProduct,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const UpdateProduct = () => {
  const { productId } = useParams();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  const [count, setCount] = useState(0);

  const preload = (productId) => {
    getProduct(productId).then((data) => {
      console.log("data", data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          stock: data.stock,
          formData: new FormData(),
        });
        preloadCategories();
      }
    });
  };

  useEffect(() => {
    preload(productId);
  }, []);

  const handleChange = (name) => (even) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const { user, token } = isAuthenticated();

  const preloadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(productId, user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          stock: "",
          loading: false,
          createdProduct: data.name,
          getRedirect: true,
        });
      }
    });
  };

  const successMessage = () => {
    return (
      <div
        style={{ display: createdProduct ? "" : "none" }}
        className="mb-4 max-w-md rounded-md mx-auto text-lg font-bold px-6 py-5 text-lime-600"
        role="alert"
      >
        <h4>{createdProduct} updated successfully</h4>
      </div>
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (getRedirect) setCount(1);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [getRedirect]);

  const warningMessage = () => {
    return (
      <div
        style={{ display: error ? "" : "none" }}
        className="mb-4 max-w-md rounded-md mx-auto text-lg font-bold px-6 py-5 text-red-600"
        role="alert"
      >
        <h4>Failed to update product</h4>
      </div>
    );
  };

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div>
        <label>
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
            className="block border w-full  border-grey-light my-3 p-2 rounded mb-4"
          />
        </label>
      </div>
      <div>
        <input
          onChange={handleChange("name")}
          name="photo"
          placeholder="Name"
          value={name}
          className="block border text-black w-full  border-grey-light my-3 p-2 rounded mb-4"
        />
      </div>
      <div>
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="block border w-full text-black border-grey-light my-3 p-2 rounded mb-4"
          placeholder="Description"
          value={description}
        />
      </div>
      <div>
        <input
          onChange={handleChange("price")}
          type="number"
          className="block border w-full text-black my-3 p-2 rounded mb-4"
          placeholder="Price"
          value={price}
        />
      </div>
      <div>
        <select
          onChange={handleChange("category")}
          className="form-select appearance-none
        block
        w-full
        p-2
        rounded mb-4
        text-gray-400"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => {
              return (
                <option key={index} value={cate._id}>
                  {cate.name}
                </option>
              );
            })}
        </select>
      </div>
      <div>
        <input
          onChange={handleChange("stock")}
          type="number"
          className="block border w-full text-black my-3 p-2 rounded mb-4"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="border-2 p-2  mb-3 font-bold rounded-md"
      >
        Update Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className=" py-5 px-3 bg-slate-400 mx-auto w-3/4 mt-8 mb-4 rounded-md"
    >
      <div>
        <button className="border-2 p-2 text-slate-700 mb-3 font-bold rounded-md border-slate-700 hover:bg-slate-600 hover:text-white">
          <Link to="/admin/dashboard">Admin Home</Link>
        </button>
      </div>
      <div className="  bg-[#343a40] rounded-md">
        <div className="mx-40 text-white ">
          {successMessage()}
          {warningMessage()}
          {count == 1 && <Navigate to="/admin/dashboard" />}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
