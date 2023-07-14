import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";

const Profile = () => {

  const {user} = isAuthenticated();

  return (
    <Base title="User Profile" description="">
      <h1 className="text-black text-center text-3xl text-bold">Welcome back, {user.name}!</h1>
      <div className="text-center text-black">
        <h1>Name: {user.name}</h1>
        <h1>Email: {user.email}</h1>
      </div>
    </Base>
  );
};

export default Profile;
