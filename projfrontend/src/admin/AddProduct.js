import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories } from "./helper/adminapicall";

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

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data });
        console.log(categories);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const handleChange = (name) => {
    //
  };

  const onSubmit = (event) => {
    //
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
          className="block border w-full  border-grey-light my-3 p-2 rounded mb-4"
        />
      </div>
      <div>
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="block border w-full  border-grey-light my-3 p-2 rounded mb-4"
          placeholder="Description"
          value={description}
        />
      </div>
      <div>
        <input
          onChange={handleChange("price")}
          type="number"
          className="block border w-full  my-3 p-2 rounded mb-4"
          placeholder="Price"
          value={price}
        />
      </div>
      <div>
        <select
          onChange={handleChange("category")}
          //   className="w-full my-3 p-2 rounded mb-4 "
          className="form-select appearance-none
        block
        w-full
        p-2
        rounded mb-4
        text-gray-400"
          placeholder="Category"
        >
          <option>Select</option>
          <option value="a">a</option>
          <option value="b">b</option>
        </select>
      </div>
      <div>
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="block border w-full my-3 p-2 rounded mb-4"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="border-2 p-2  mb-3 font-bold rounded-md"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className=" p-4 bg-slate-400 mx-auto w-3/4 mt-8 mb-4"
    >
      <div>
        <button className="border-2 p-2 text-slate-700 mb-3 font-bold rounded-md border-slate-700 hover:bg-slate-600 hover:text-white">
          <Link to="/admin/dashboard">Admin Home</Link>
        </button>
      </div>
      <div className=" py-5 bg-[#343a40] px-3">
        <div className="mx-40 text-white">{createProductForm()}</div>
      </div>
    </Base>
  );
};

export default AddProduct;
