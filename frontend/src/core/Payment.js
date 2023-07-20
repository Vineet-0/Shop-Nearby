import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { API } from "../backend";
import CheckoutForm from "./helper/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const Payment = ({ products, total }) => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch(`${API}/config`).then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch(`${API}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <>
      <div className="bg-white w-[400px] px-8 pb-4 pt-1 rounded-xl">
        <h1>Stripe payment</h1>
        {stripePromise && clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm total={total} />
          </Elements>
        )}
      </div>
    </>
  );
};

export default Payment;
