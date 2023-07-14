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
      <span className="text-2xl font-bold text-[#05445E] mb-4">Post photo</span>
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
        className="px-4 py-2 bg-[#05445E] mb-3 font-bold rounded-md hover:bg-[#189AB4]"
      >
        Update Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className=" p-8 bg-[#189AB4] mx-auto w-3/4 mt-8 mb-4 rounded-md"
    >
      <div className="">
        <div>
          <button className="px-4 py-2 text-[#05445E] bg-[#75E6DA] mb-4 font-bold rounded-md hover:bg-[#05445E] hover:text-white">
            <Link to="/admin/dashboard">Admin Home</Link>
          </button>
        </div>
        <div className="  bg-[#75E6DA] rounded-md p-4">
          <div className="mx-40 text-white ">
            {successMessage()}
            {warningMessage()}
            {count == 1 && <Navigate to="/admin/dashboard" />}
            {createProductForm()}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
