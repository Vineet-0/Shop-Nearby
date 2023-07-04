const stripe = require("stripe")(
  "sk_test_51NPUHOSEqs1ngiqUNqzPXKODW8SlPQaxdtWsp73KMxz3rWqaf60uBYhbpmuugKp9kUZztI8mH6wGoSFK9K0oAai300S4oCnXM3"
);
const uuid = require("uuid/v4");

exports.makePayment = async (req, res) => {
  const { products } = req.body;
  console.log("PRODUCTS", products);

  let amount = 0;
  products.map((p) => {
    amount = amount + p.price;
  });

  //   const idempotencyKey = uuid();

  //   return stripe.customers
  //     .create({
  //       email: token.email,
  //       source: token.id,
  //     })
  //     .then((customer) => {
  //       stripe.charges
  //         .create(
  //           {
  //             amount: amount,
  //             currency: "inr",
  //             customer: customer.id,
  //             receipt_email: token.email,
  //             description: "a test account",

  //             shipping: {
  //               name: token.card.name,
  //               address: {
  //                 line1: token.card.address_line1,
  //                 line2: token.card.address_line2,
  //                 city: token.card.address_city,
  //                 country: token.card.address_country,
  //                 postal_code: token.card.address_zip,
  //               },
  //             },
  //           },
  //           { idempotencyKey }
  //         )
  //         .then((result) => res.status(200).json(result))
  //         .catch((err) => console.log(err));
  //     });

  const customer = await stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken,
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        price: { amount },
      },
    ],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
