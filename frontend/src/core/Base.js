import React from "react";
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
      <Menu />
      <div className="min-h-screen">
        <div className="text-black text-center font-bold">
          <h2 className="text-5xl pt-5 pb-4">{title}</h2>
          <p>{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Base;
