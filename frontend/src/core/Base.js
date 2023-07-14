import React from "react";
import Menu from "../core/Menu";
import Footer from "../core/Footer";

const Base = ({
  className = "text-white p-4",
  children,
}) => {
  return (
    <>
      <Menu />
      <div className="min-h-screen">
        <div className="text-black text-center font-bold">
        </div>
        <div className={className}>{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Base;
