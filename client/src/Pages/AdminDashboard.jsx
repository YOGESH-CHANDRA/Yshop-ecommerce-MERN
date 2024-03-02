import axios from "axios";
import React, { useEffect, useState } from "react";
// import Users from "../components/Users";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../admin-components/Sidebar";
import { toast } from "react-toastify";

const AdminDashboard = () => {
// const [isAdmin,setIsAdmin]= useState("false");
const [isAdmin,setIsAdmin]= useState(JSON.parse(localStorage.getItem("isAdmin")));
const navigate=useNavigate();

// console.log("not admin")
// console.log(isAdmin)

if(!isAdmin){
  toast.info("Admin login required");
  console.log("not admin")
  navigate("/")
}
  useEffect(()=>
  {
    setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")));
  },[])
  return (
    <>
      <h1 className="text-center bg-danger">Dashboard</h1>
      <div className="admin d-lg-flex flex-lg-row flex-md-column">
        <Sidebar />
        <Outlet />
      </div>
    </>

  );
};

export default AdminDashboard;
