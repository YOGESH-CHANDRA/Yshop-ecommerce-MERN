const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");

const router = express.Router();


// stripe payment 
router.post("/payment", async (req, res) => {
  try {
    // console.log(req.body);
    const {cartItems} = req.body;
    console.log(cartItems);
    // console.log(shippingAddress)
    // console.log(cartItems.map((item) => item));

    const lineItems = cartItems.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.name,
          images: [product.image],
          description: product.description,
        },
        unit_amount: product.price * 100,
      },
      quantity: 1,
    }));

    // Create order id;
const orderId=`ys${Date.now()}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success?orderId=${orderId}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel?orderId=${orderId}`,
    });
    // console.log(session);
     return res.json({ id: session.id });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
