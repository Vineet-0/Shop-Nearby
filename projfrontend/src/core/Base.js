import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "../core/Menu";
import Footer from "../core/Footer";

const Base = ({
  title = "My Title",
  description = "My description",
  className = "text-white p-4",
  children,
}) => {
  return (
    <>
      <Menu/>
      <div>
        <div className="text-white text-center">
          <h2 className="text-4xl">{title}</h2>
          <p>{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Base;
