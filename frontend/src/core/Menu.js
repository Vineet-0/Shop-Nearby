import React, { useState, useEffect } from "react";
import { Link, Navigate, redirect } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";
import imageLogo from "./Shop_Nearby_Logo.png";
import imageSignOut from "./Log_Out_Logo.png";

const Menu = () => {
  const redirectToHome = () => {
    return <Navigate to="/" />;
  };

  const [signOut, setSignout] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { user } = isAuthenticated();

  return (
    <nav className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/">
              <img className="h-14 w-auto" src={imageLogo} alt="Logo" />
            </Link>
          </div>
          <div className="hidden md:block text-[17px]">
            <div className="ml-4 flex items-center md:ml-6 list-none">
              <li>
                <Link
                  to="/"
                  className="block py-2 pl-3 pr-4 mx-4 text-gray-900 rounded font-semibold hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-[#75E6DA] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="block py-2 pl-3 pr-4 mx-4 text-gray-900 rounded font-semibold hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-[#75E6DA] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="block py-2 pl-3 pr-4 mx-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-[#75E6DA] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Cart
                </Link>
              </li>
              {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li>
                  <Link
                    to="/user/profile"
                    className="block py-2 pl-3 pr-4 mx-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-[#75E6DA] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block py-2 pl-3 pr-4 mx-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-[#75E6DA] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    A. Dashboard
                  </Link>
                </li>
              )}
              {!isAuthenticated() && (
                <>
                  <li>
                    <Link
                      to="/signup"
                      className="block py-2 pl-3 pr-4 mx-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-[#75E6DA] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      SignUp
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signin"
                      className="block py-2 pl-3 pr-4 mx-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-[#75E6DA] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      SignIn
                    </Link>
                  </li>
                </>
              )}
              {isAuthenticated() && (
                <li>
                  <span
                    onClick={() => {
                      signout(() => setSignout(true));
                    }}
                    className="block py-2 pl-3 pr-4 mx-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-[#75E6DA] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:hover:cursor-pointer"
                  >
                    <div className="flex flex-row items-center">
                      {user.name} <img className="h-10 w-auto" src={imageSignOut} alt="Logo" />
                    </div>
                  </span>
                </li>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          {/* ml-4 flex items-center md:ml-6 list-none */}
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center font-bold list-none">
            <li>
              <Link
                to="/"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-[#75E6DA] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent "
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-[#75E6DA] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent "
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-[#75E6DA] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent "
              >
                Cart
              </Link>
            </li>
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <li>
                <Link
                  to="/user/dashboard"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-[#75E6DA] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent "
                >
                  Dashboard
                </Link>
              </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <li>
                <Link
                  to="/admin/dashboard"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-[#75E6DA] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent "
                >
                  A. Dashboard
                </Link>
              </li>
            )}
            {!isAuthenticated() && (
              <>
                <li>
                  <Link
                    to="/signup"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-[#75E6DA] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent "
                  >
                    SignUp
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signin"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-[#75E6DA] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent "
                  >
                    SignIn
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated() && (
              <li>
                <span
                  onClick={() => {
                    signout(() => setSignout(true));
                  }}
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-[#75E6DA] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:hover:cursor-pointer "
                >
                  Signout <img className="h-10 w-auto" src={imageSignOut} alt="Logo" />
                </span>
              </li>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Menu;
