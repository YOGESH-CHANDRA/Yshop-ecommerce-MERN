import React, { useContext, useEffect } from "react";

import { useStore } from "../Context/ShopContext";
import { Link } from "react-router-dom";
import CartItem from "../components/Cart-item";


const Cart = () => {
  const { getTotalCartAmount, cartItems, deleteAllFromCart } = useStore();

  return (
    <div className="container text-center text-capitalize">
      <h1 className="my-3">Products in Cart</h1>
      {cartItems.length == 0 ? (
        <h3 className="text-secondary">Cart is empty.</h3>
      ) : null}
      <div className="d-flex row justify-content-between ">
        <div className="col-lg-8 col-md-12 ">
          {cartItems.length>0 &&
            cartItems.map((item, i) => <CartItem key={i} item={item} />)}
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
          <button className="btn btn-info me-2" onClick={deleteAllFromCart}>
            Empty Cart
          </button>
          <Link
            to="/checkout"
            className="text-decoration-none text-black  btn btn-info"
          >
            Checkout
          </Link>
        </div>
      </div>
      <Link
        to="/allproducts"
        className="text-decoration-none bg-danger my-3 rounded"
      >
        <h2 className="btn ">Continue shopping..</h2>
      </Link>
    </div>
  );
};

export default Cart;
