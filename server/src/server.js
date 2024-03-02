require("dotenv").config();
const DataBaseConnection = require("./db/connection");
const express = require("express");

const path = require("path");
const cors = require("cors");
const userRouter = require("./routes/user.route");
const productRouter = require("./routes/product.route");
const paymentRouter = require("./routes/payment.route");
const orderRouter = require("./routes/order.route");
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Routers
app.use("/api/v1/product", productRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/order", orderRouter);
app.use(paymentRouter);

app.get("/", (req, res) => {
  res.send("api is working");
});

DataBaseConnection()
  .then((connection) => {
    app.listen(port, () => {
      console.log(`app is running on port no ${port}`);
    });
  })
  .catch((error) => console.log(error));
