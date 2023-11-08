import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";

const UserInfo = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  
    return (
      <div className="ml-2 bg-white">
        <h4 className="font-medium text-xl px-8 py-4 text-gray-200 bg-[#05445E]">
          Admin Information
        </h4>
        <ul>
          <li className="px-8  py-3 border-t-2 border-b-slate-700 bg-white">
            <span className="font-bold text-[#05445E] p-1 rounded-md">
              Name:
            </span>{" "}
            {name}
          </li>
          <li className="px-8 py-3 border-t-2 border-b-slate-700 bg-white">
            <span className="font-bold text-[#05445E] p-1 rounded-md">
              Email:
            </span>{" "}
            {email}
          </li>
          <li className="px-8 py-3 border-t-2 border-b-slate-700 bg-white">
            <span className="text-white bg-red-500 px-4 py-2 rounded-md">
              Admin Area
            </span>
          </li>
        </ul>
      </div>
    );
};

export default UserInfo;
