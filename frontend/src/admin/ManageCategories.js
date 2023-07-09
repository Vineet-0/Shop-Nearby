import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, deleteCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const { user, token } = isAuthenticated();

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };



  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base
      title="Welcome admin"
      description="Manage categories here"
      className="mt-8 mx-auto w-4/5 mb-4"
    >
      <div className="bg-[#189AB4] p-8 rounded-md">
        <h2 className="mb-4 text-2xl font-bold text-white">All Categories:</h2>
        <button className="px-4 py-2 text-[#05445E] bg-[#75E6DA] mb-2 font-bold rounded-md hover:bg-[#05445E] hover:text-white">
          <Link to={`/admin/dashboard`}>
            <span className="">Admin Home</span>
          </Link>
        </button>
        <div>
          <h2 className="text-center text-2xl font-bold text-white mb-4">
            Total {categories.length} categories
          </h2>

          {categories.map((category, index) => {
            return (
              <div key={index} className="grid grid-cols-3 text-center mb-1 bg-[#75E6DA] rounded-xl">
                <div className="flex items-center justify-center">
                  <h3 className="text-[#05445E] text-xl font-bold">{category.name}</h3>
                </div>
                <div>
                  <button className="px-4 py-2 text-white bg-green-500 my-2 font-bold rounded-md hover:bg-green-700">
                    <Link to={`/admin/category/update/${category._id}`}>
                      <span className="">Update</span>
                    </Link>
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      deleteThisCategory(category._id);
                    }}
                    className="px-4 py-2 text-white bg-red-600 my-2 font-bold rounded-md hover:bg-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
