import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useStore } from "../Context/ShopContext";
import axios from "axios";
import API from "../api/api";
import { toast } from "react-toastify";

const Success = () => {
  const {setCartItems } = useStore();
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const orderId = query.get("orderId");
  console.log(" orderId : ", orderId);

  const shippingAddress = localStorage.getItem("shippingAddress");
  const cartItems = JSON.parse(localStorage.getItem("yshopCart"));

  const items = cartItems.length;
  const amount = cartItems.reduce((a, b) => a + Number(b.price), 0);

  const goToHome = () => {
    navigate("/");
  };

  const orderStatus = async () => {
    const orderInfo = {
      orderId,
      items,
      amount,
      shippingAddress,
    };
    try {
      const token=localStorage.getItem("yshopToken");
      console.log("orderInfo : ", orderInfo);
      const { data } = await axios.post(
        `${API}/api/v1/order`,
        orderInfo,{headers:{
          'Authorization': `Bearer ${token}`
        }}
      );
      // console.log(data);
      if (data) {
        localStorage.setItem("yshopCart","[]");
        setCartItems([]);
      }
    } catch (error) {
      toast.error(error)
    }
  };

  useEffect(() => {
    orderStatus();
  }, []);

  return (
    <div className="m-auto text-center">
      <h1 className="text-success text-center">
        Your order is placed succefully{" "}
      </h1>
      <h2 >Your Order Id is {orderId}</h2>
      <p >Thank You for Shopping with Us </p>
      <br />
      <button className=" text-decoration-underline btn btn-success" onClick={goToHome}>
        Go to home
      </button>
    </div>
  );
};

export default Success;
