import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, deleteCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

import UpdateCategory from "./UpdateCategory";

import { FiEdit } from 'react-icons/fi';
import { MdDeleteForever } from 'react-icons/md';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const { user, token } = isAuthenticated();

  const handleEditCategory = (category) => {
    setCategoryToEdit(category);
    setEditMode(true);
  };

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
    <div className="bg-[#189AB4] p-8">
      {editMode ? (
        <UpdateCategory categoryId={categoryToEdit._id}  />
      ) : (
        <div>
            <div className="flex justify-between">
              <h2 className="mb-4 text-2xl font-bold text-white">All Categories:</h2>
              <h2 className="text-2xl font-bold text-white">Total {categories.length} categories</h2>
            </div>
            <div>
              {categories.map((category, index) => (
                <div key={index} className="flex justify-between text-center mb-1 px-8 bg-white rounded-md">
                  <div className="flex items-center justify-center">
                    <h3 className="text-[#05445E] text-xl font-bold">{category.name}</h3>
                  </div>
                  <div className="flex items-center justify-center">
                    <div>
                      <button
                        className="text-xl px-4 py-2 text-green-500 bg-white my-2 font-bold rounded-md"
                        onClick={() => handleEditCategory(category)}
                      >
                        <span className=""><FiEdit /></span>
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          deleteThisCategory(category._id);
                        }}
                        className="text-2xl px-4 py-2 text-red-600 bg-white my-2 font-bold rounded-md"
                      >
                        <MdDeleteForever />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
      )}
    </div>
  );
};

export default ManageCategories;
