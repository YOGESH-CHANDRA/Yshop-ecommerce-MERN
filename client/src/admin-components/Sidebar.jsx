import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="d-flex h-lg-100 h-md-25 flex-lg-column flex-md-row bg-secondary bg-opacity-50   "
      
    >
      <Link
        to="/admin/products"
        className="text-decoration-none text-bg-danger p-2 d-block border border-white "
      >
        Product Details
      </Link>
      <Link
        to="/admin/add-product"
        className="text-decoration-none text-bg-danger p-2 d-block border border-white "
      >
        Add Product
      </Link>
      <Link
        to="/admin/orders"
        className="text-decoration-none text-bg-danger p-2 d-block border border-white "
      >
        Order Status
      </Link>
      

      <Link
        to="/admin/users"
        className="text-decoration-none text-bg-danger p-2  border border-white m-0"
      >
        User Details
      </Link>
    </div>
  );
};

export default Sidebar;
