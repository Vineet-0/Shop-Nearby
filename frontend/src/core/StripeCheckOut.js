import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";

const StripeCheckout = ({
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

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_51NPUHOSEqs1ngiqUqYW9ZKd5s6feRB6siZRMTkbXsJ6SKRkdZYwTbHSsxI0TsZErwGqfIHilelJ9PXHwJkrHq0EC00SclXHE11"
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Buy Tshirts"
        billingAddressCollection
      >
        <button className="p-2 text-white bg-green-600 mb-3 font-bold rounded-md ">
          Pay with stripe
        </button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="p-2 text-black  mb-3 font-bold rounded-md bg-yellow-500">
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

export default StripeCheckout;
