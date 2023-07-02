import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const AdminLeftSide = () => {
    return (
      <div className="mr-4 text-center border-slate-700 rounded-md">
        <h4 className="font-bold text-gray-200 text-xl py-4 bg-slate-900 ">
          Admin Navigation
        </h4>
        <ul>
          <li className="font-bold text-slate-700 text-xl py-4 border-t-2 border-b-slate-700 bg-white hover:text-blue-600">
            <Link to="/admin/create/category">Create Categories</Link>
          </li>
          <li className="font-bold text-slate-700 text-xl py-4 border-t-2 border-b-slate-700 bg-white hover:text-blue-600">
            <Link to="/admin/categories">Manage Categories</Link>
          </li>
          <li className="font-bold text-slate-700  text-xl py-4 border-t-2 border-b-slate-700 bg-white  hover:text-blue-600">
            <Link to="/admin/create/product">Create Product</Link>
          </li>
          <li className="font-bold text-slate-700  text-xl py-4 border-t-2 border-b-slate-700 bg-white  hover:text-blue-600">
            <Link to="/admin/products">Manage Products</Link>
          </li>
          <li className="font-bold text-slate-700  text-xl py-4 border-t-2 border-b-slate-700 bg-white  hover:text-blue-600">
            <Link to="/admin/orders">Manage Orders</Link>
          </li>
        </ul>
      </div>
    );
  };

  const AdminRightSide = () => {
    return (
      <div className="ml-2 bg-white">
        <h4 className="font-medium px-3 bg-gray-400 text-xl py-3">
          Admin Information
        </h4>
        <ul>
          <li className="px-3  py-3 border-t-2 border-b-slate-700 bg-white">
            <span className="text-white bg-slate-600 p-1 rounded-md">
              Name:
            </span>{" "}
            {name}
          </li>
          <li className="px-3  py-3 border-t-2 border-b-slate-700 bg-white">
            <span className="text-white bg-slate-600 p-1 rounded-md">
              Email:
            </span>{" "}
            {email}
          </li>
          <li className="px-3  py-3 border-t-2 border-b-slate-700 bg-white">
            <span className="text-white bg-red-500 p-1 px-2 rounded-md">
              Admin Area
            </span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      className="container p-4 bg-slate-600 rounded-md mx-auto mt-10"
      title="Welcome to admin area"
      description="Manage all of your products here"
    >
      <div className="w-full flex">
        <div className="w-1/4">{AdminLeftSide()}</div>
        <div className="w-3/4">{AdminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
