import React from "react";
import { useStore } from "../Context/ShopContext";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/api"

const Checkout = () => {
  const { cartItems, getTotalCartAmount, address, setAddress } = useStore();

  const navigate = useNavigate();
  const changeHandler = (e) => {
    setAddress((prev) => {
      const { name, value } = e.target;

      return { ...prev, [name]: value };
    });
  };

  const payment = async (async) => {
    if(!localStorage.getItem("yshopToken")){
      return toast.info("Login required")
    }
    try {
      if (
        !address.address ||
        !address.city ||
        !address.state ||
        !address.pincode
      ) {
        toast.warning("Shipping address required");
      } else if (!cartItems.length > 0) {
        toast.info("Cart is empty");
      } else {
        const shippingAddress = `${address.address}, ${address.city}, ${address.state}-${address.pincode}`;
        localStorage.setItem("shippingAddress", shippingAddress);
        const stripe = await loadStripe(
          "pk_test_51OkmuHSBfnlUb5nVqIqOIMUFUxQKPN1XX1vI46DabyZazVZhGvXJlGszZgaHiFBCmbaRteYyYXP6uvmsHOd5f3dy007306WyWH"
        );

        const { data } = await axios.post(`${API}/payment`, { cartItems });

        const result = stripe.redirectToCheckout({ sessionId: data.id });
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="container text-center text-capitalize">
      <h1 className="my-3">CheckOut</h1>
      <div className="d-flex row justify-content-between ">
        <div className="col-lg-8 col-md-12">
          <h3 className="text-center text-uppercase text-secondary">
            Shipping Address
          </h3>
          <form className="was-validated">
            <div className="form-group ">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                id="address"
                value={address.address}
                placeholder="Enter address"
                required
                onChange={changeHandler}
              />
            </div>
            <div className="form-group ">
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                className="form-control"
                id="city"
                placeholder="City "
                value={address.city}
                required
                onChange={changeHandler}
              />
            </div>
            <div className="form-group ">
              <label htmlFor="state">State</label>
              <input
                type="text"
                name="state"
                className="form-control"
                id="state"
                placeholder="State "
                value={address.state}
                required
                onChange={changeHandler}
              />
            </div>
            <div className="form-group ">
              <label htmlFor="pincode">Pin Code</label>
              <input
                type="number"
                name="pincode"
                className="form-control"
                id="pincode"
                placeholder="Pin code "
                required
                value={address.pincode}
                min={100000}
                max={999999}
                onChange={changeHandler}
              />
            </div>
            <br />
          </form>
        </div>
        <div className="col-lg-3 col-md-12 text-center   bg-secondary bg-opacity-25 border border-2 h-25 p-3 rounded-3 m-lg-0 m-md-3">
          <h1 className="  bg-secondary bg-opacity-50 mb-3 rounded-1">
            Summary
          </h1>
          <h3 className="d-flex justify-content-between">
            <span>Total Items : </span>
            <span>{cartItems.length}</span>
          </h3>
          <h3 className="d-flex justify-content-between">
            <span>Cost :</span>
            <span>Rs. {getTotalCartAmount()}</span>
          </h3>
          <h3 className="d-flex justify-content-between">
            <span>Shipping : </span>
            <span>Free</span>
          </h3>
          <hr />
          <h2 className="d-flex justify-content-between">
            <span>Total </span>
            <span>Rs. {getTotalCartAmount()}</span>
          </h2>
          <hr />

          <button
            className="text-decoration-none text-black  btn btn-info p-1 mx-1"
            onClick={() => navigate("/cart")}
          >
            Return to cart
          </button>
          <button
            className="text-decoration-none text-black  btn btn-danger p-1 mx-1 "
            onClick={payment}
          >
            Payment Preceed .. .
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
