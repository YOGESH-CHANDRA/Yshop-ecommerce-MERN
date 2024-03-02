import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useStore } from "../Context/ShopContext";

const CartItem = ({ item }) => {
  const { removeFromCart } = useStore();
  // console.log(item);
  return (
    <div className="cart-item d-flex  mb-5 shadow-lg rounded-5">
      <img
        src={item.image}
        className="rounded-5 img-fluid"
        height={100}
        width={100}
      />
      <div className="d-flex flex-column justify-content-around w-100">
        <h3>Product Code: {item.code}</h3>
        <h4>{item.name}</h4>
        <p>{item.description}</p>
        <h5>Rs. {item.price}</h5>
        <button
          className="btn btn-danger w-50 my-2 m-auto p-0"
          onClick={() => removeFromCart(item)}
        >
          <MdDeleteOutline size={30} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
