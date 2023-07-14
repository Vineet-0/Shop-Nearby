import React from "react";
import { Link, Navigate, redirect } from "react-router-dom";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";

const Profile = () => {

  const {user} = isAuthenticated();

  return (
    <Base title="User Profile" description="">
      <div className="mt-16 w-full flex justify-center">
        <div className="w-4/5 lg:w-1/2 ml-2 bg-white">
          <h4 className="font-medium text-xl px-8 py-4 text-gray-200 bg-[#05445E]">
            User Information
          </h4>
          <ul>
            <li className="px-8  py-3 border-t-2 border-b-slate-700 bg-white">
              <span className="font-bold text-[#05445E] p-1 rounded-md">
                Name:
              </span>{" "}
              <span className="text-black">
              {user.name}
              </span>

            </li>
            <li className="px-8 py-3 border-t-2 border-b-slate-700 bg-white">
              <span className="font-bold text-[#05445E] p-1 rounded-md">
                Email:
              </span>{" "}
              <span className="text-black">
              {user.email}
              </span>
            </li>
            <li className="px-8 py-3 border-t-2 border-b-slate-700 bg-white">
              <span className="text-white font-bold bg-[#05445E] hover:bg-[#75E6DA] hover:text-black px-4 py-2 rounded-md">
                <Link to="/">
                  Continue Shopping
                </Link>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </Base>
  );
};

export default Profile;
