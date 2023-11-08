import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { deleteProduct, getProducts } from "./helper/adminapicall";

import { FiEdit } from 'react-icons/fi';
import { MdDeleteForever } from 'react-icons/md';

import UpdateProduct from "./UpdateProduct";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const { user, token } = isAuthenticated();

  const handleEditProduct = (product) => {
    setProductToEdit(product);
    setEditMode(true);
  };

  const preload = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
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
        <UpdateProduct productId={productToEdit._id}  />
      ) : (
        <div>
          <div className="flex justify-between">
            <h2 className="mb-4 text-2xl font-bold text-white">All products:</h2>
            <h2 className="text-2xl font-bold text-white">Total {products.length} products</h2>
          </div>
          <div>
            {products.map((product, index) => {
              return (
                <div key={index} className="flex justify-between text-center mb-1 px-8 bg-white rounded-md">
                  <div className="flex items-center justify-center">
                    <h3 className="text-[#05445E] text-xl font-bold">{product.name}</h3>
                  </div>
                  <div className="flex items-center justify-center">
                    <div>
                      <button
                          className="text-xl px-4 py-2 text-green-500 bg-white my-2 font-bold rounded-md"
                          onClick={() => handleEditProduct(product)}
                      >
                          <span className=""><FiEdit /></span>
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          deleteThisProduct(product._id);
                        }}
                        className="text-2xl px-4 py-2 text-red-600 bg-white my-2 font-bold rounded-md"
                      >
                        <MdDeleteForever />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      </div>
  );
};

export default ManageProducts;
