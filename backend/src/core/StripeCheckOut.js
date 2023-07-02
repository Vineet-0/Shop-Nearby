import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";

const StripeCheckOut = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <button
        className="p-2 text-white bg-green-600 mb-3 font-bold rounded-md "
      >
        Pay with stripe
      </button>
    ) : (
      <Link to="/signin">
        <button
          className="p-2 text-black  mb-3 font-bold rounded-md bg-yellow-500"
        >
          Signin
        </button>
      </Link>
    );
  };


  return (
    <div>
      <h3 className="text-white">Stripe checkout {getFinalAmount()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckOut;
