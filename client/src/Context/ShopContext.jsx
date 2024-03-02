import axios from "axios";
import { toast } from "react-toastify";
import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/api";

const ShopContext = createContext(null);

export const ShopContextProvider = ({ children }) => {
  const [listOfProducts, setListOfProducts] = useState("");
  const [token,setToken]= useState(localStorage.getItem("yshopToken"))
  const [admin, setAdmin]= useState(localStorage.getItem("isAdmin"))


  // console.log(token,admin)
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems.length > 0) {
        let totalAmount = cartItems.reduce((a, b) => a + Number(b.price), 0);
        return totalAmount;
      } else return (totalAmount = 0);
    }
    return totalAmount;
  };

  const addToCart = async (product) => {
    const exitingItem = listOfProducts.find((item) => item._id == product._id);

   
    try {
      setCartItems((prev) => {
        localStorage.setItem("yshopCart", JSON.stringify([...prev, exitingItem]));
        return [...prev, exitingItem];
      });
      toast.info("Product added in cart");
    } catch (error) {
      toast.warning("Product not added in cart");
    }
  };

  const deleteAllFromCart = () => {
    const isDelete = window.confirm("Want to empty cart ?");
    alert(isDelete);
    if (isDelete) {
      setCartItems([]);
      localStorage.removeItem("yshopCart");
      toast.info("Cart is empty");
    }
  };
  const removeFromCart = (product) => {
    const restItem = cartItems.filter((item, i) => item._id != product._id);
    const isRemove = window.confirm("Want to remove from cart ?");
    alert(isRemove);
    if (isRemove) {
      setCartItems(restItem);
      localStorage.setItem("yshopCart", JSON.stringify(restItem));
      toast.info("Product remove from cart");
    }
  };

  const getAllProducts = async () => {
    try {
      // console.log("Get all datas");
      const resp = await axios.get(`${API}/api/v1/product`);
      setListOfProducts(resp.data);
    } catch (error) {
      toast(error.message);
    }
  };

  const contextValue = {
    cartItems,
    setCartItems,
    addToCart,
    deleteAllFromCart,
    removeFromCart,
    getTotalCartAmount,
    listOfProducts,
    setListOfProducts,
    getAllProducts,
    address,
    setAddress,
    token,setToken,
    admin, setAdmin
    
  };
  
  useEffect(() => {
    getAllProducts();
   
     const existingCart = JSON.parse(localStorage.getItem("yshopCart"));
    if (existingCart) {
      setCartItems(existingCart);
      console.log(existingCart)
    }
  }, []);
  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export const useStore = () => {
  const Store = useContext(ShopContext);
  return Store;
};
