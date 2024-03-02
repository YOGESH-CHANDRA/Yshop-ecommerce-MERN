import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import API from "../api/api"

const Cancel = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const orderId = query.get("orderId");
  // console.log(" orderId : ", orderId);

  const shippingAddress = localStorage.getItem("shippingAddress");
  const cartItems = JSON.parse(localStorage.getItem("yshopCart"));

  const items = cartItems.length;
  const amount = cartItems.reduce((a, b) => a + Number(b.price), 0);

  const orderStatus = async () => {
    const orderInfo = {
      orderId,
      items,
      amount,
      shippingAddress,
      deliveryStatus:"canceled"
    };
    try {
      // console.log("orderInfo : ", orderInfo);
      const token=localStorage.getItem("yshopToken");
      const { data } = await axios.post(
        `${API}/api/v1/order`,
        orderInfo,{headers:{
          'Authorization': `Bearer ${token}`
        }}
      );
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    orderStatus();
  }, []);

  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="m-auto text-center">
      <h1 className="text-info text-center">Your order is not placed </h1>
      <h2 className="text-center">Your Order Id is {orderId}</h2>
      <br />
      <botton className="text-center text-decoration-underline btn btn-primary" onClick={goToCart}>
        Go to cart
      </botton>
    </div>
  );
};

export default Cancel;
