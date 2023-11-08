import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Navigate } from "react-router-dom";
import { getCategories, createaProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";


const AddProduct = () => {
 
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

  const preload = () => {
    getCategories().then((data) => {
      console.log("data", data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const handleChange = (name) => (even) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const { user, token } = isAuthenticated();
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createaProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          stock: "",
          latitude: "",
          longitude: "",
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
        <h4>{createdProduct} created successfully</h4>
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
        <h4>Failed to create product</h4>
      </div>
    );
  };

  const createProductForm = () => (
    <form>
      <span className="text-2xl font-bold text-white mb-4">Post photo</span>
      <div>
        <label>
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
            className=" block border w-full bg-white text-[#05445E] border-[#05445E] my-3 p-2 rounded mb-4"
          />
        </label>
      </div>
      <div>
        <input
          onChange={handleChange("name")}
          name="photo"
          placeholder="Name"
          value={name}
          className="block border w-full text-[#05445E] border-[#05445E] my-3 px-4 py-2 rounded mb-4"
        />
      </div>
      <div>
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="block border w-full text-black border-[#05445E] my-3 px-4 py-2 rounded mb-4"
          placeholder="Description"
          value={description}
        />
      </div>
      <div>
        <input
          onChange={handleChange("price")}
          type="number"
          className="block border w-full text-black border-[#05445E] my-3 px-4 py-2 rounded mb-4"
          placeholder="Price"
          value={price}
        />
      </div>
      <div>
        <select
          onChange={handleChange("category")}
          className="form-select appearance-none block w-full px-4 py-2 rounded mb-4 text-gray-400 border border-[#05445E]"
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
          className="block border w-full text-black border-[#05445E] my-3 px-4 py-2 rounded mb-4"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="px-4 py-2 text-white bg-[#05445E] font-bold rounded-md hover:bg-[#75E6DA] hover:text-[#05445E]"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <div className="bg-[#189AB4] p-8">
      {successMessage()}
      {warningMessage()}
      {count == 1 && <Navigate to="/admin/dashboard" />}
      {createProductForm()}
    </div>
  );
};

export default AddProduct;
