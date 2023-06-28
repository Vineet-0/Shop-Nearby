import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const AdminLeftSide = () => {
    return(
      <div>
        
      </div>
    )
  }

  const AdminRightSide = () => {
    // 
  }

  return (
    <Base
      title="Welcome to admin area"
      description="Manage all of your products here"
    >
      {AdminLeftSide()}
      {AdminRightSide()}
    </Base>
  );
};

export default AdminDashBoard;
