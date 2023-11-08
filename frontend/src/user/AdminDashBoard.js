import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

import UserInfo from "./UserInfo";
import AddCategory from "../admin/AddCategory";
import ManageCategories from "../admin/ManageCategories";
import AddProduct from "../admin/AddProduct";
import ManageProducts from "../admin/ManageProducts";

const AdminDashBoard = () => {
  const auth = isAuthenticated();
  const { user } = auth;

  if (!user) {
    // Handle the case when the user is not authenticated
    return <div>User not authenticated</div>;
  }

  const { name, email, role } = user;

  const [activeOption, setActiveOption] = React.useState("Admin Information");

  const AdminLeftSide = () => {
    const handleSetActive = (option) => {
      setActiveOption(option);
    };

    const options = [
      "Admin Information",
      "Create Category",
      "Manage Categories",
      "Create Product",
      "Manage Products"
    ];

    return (
      <div className="mr-4 text-center border-0 rounded-md">
        <ul>
          {options.map((option, index) => (
            <li
              key={index}
              className={`font-bold text-lg py-4 border-t-2 border-b-slate-700 hover:bg-[#05445E] hover:border-[#05445E] hover:text-white ${
                activeOption === option ? "bg-[#05445E] border-[#05445E] text-white" : "bg-white text-slate-700"
              }`}
              onClick={() => handleSetActive(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const AdminRightSide = () => {
    switch (activeOption) {
      case "Admin Information":
        return <UserInfo />;
      case "Create Category":
        return <AddCategory />;
      case "Manage Categories":
        return <ManageCategories />;
      case "Create Product":
        return <AddProduct />;
      case "Manage Products":
        return <ManageProducts />;
      default:
        return <h2>NOT FOUND</h2>;
    }
  };

  return (
    <Base
      className="container p-4 bg-[#189AB4] rounded-md mx-auto mt-16"
      title="Welcome to Admin Area"
      description="Manage all of your products here"
    >
      <div className="w-full flex">
        <div className="w-1/4 h-fit">{AdminLeftSide()}</div>
        <div className="w-3/4">{AdminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
