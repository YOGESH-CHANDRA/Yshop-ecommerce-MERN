import React, { useEffect } from "react";
import { useStore } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const { token, setToken, setAdmin } = useStore();
  const navigate = useNavigate();

  localStorage.removeItem("yshopToken");
  localStorage.removeItem("isAdmin");

  toast.success("Logout Successfully");
  navigate("/login");

  return (
    <div className="m-auto text-success">
      <h1>Logout succefully</h1>
      <h2 className="text-primary">Redirect to login page..</h2>
    </div>
  );
};

export default Logout;
