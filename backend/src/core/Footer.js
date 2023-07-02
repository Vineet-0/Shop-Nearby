import React from "react";

const Footer = () => {
  return (
    <>
      <footer className=" bottom-0  mt-auto  w-screen">
        <div className="bg-white shadow dark:bg-gray-900 py-3">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
            <div className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              If you got any question feel free to reach out!
            </div>
            <div>
              <button className=" bg-lime-200 p-2 mx-2 font-semibold text-sm rounded-md">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
