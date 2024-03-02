import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";

import { useStore } from "../Context/ShopContext";
import { toast } from "react-toastify";
import API from "../api/api";
import Spinner from "../Spinner/Spinner";

const Products = () => {
  const { getAllProducts, listOfProducts, setListOfProducts } = useStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("yshopToken");
  const editHandler = (product) => {
    navigate(`/admin/edit-product/${product._id}`);
  };

  const deleteHandler = async (id) => {
    try {
      // console.log("id: ", id);
      setLoading(true);
     
      if (window.confirm("Want to delete product ?")) {
        const resp = await axios.delete(`${API}/api/v1/product/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Product deleted from database");
      }
      setLoading(false);
      getAllProducts();
    } catch (error) {
      toast.error("Product not delete of id :", id);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="mx-auto">
      <h3 className="text-center bg-black text-white">
        Products List ( Total products : {listOfProducts.length} )
      </h3>
      {!loading ? (
        <div className="table-responsive">
          <table className="table w-50 m-auto w-md-100 text-center text-capitalize">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Code</th>
                <th scope="col">Product Name</th>
                <th scope="col">Rate (price)</th>
                <th scope="col">Quantity</th>
                <th scope="col">Category</th>
                <th scope="col">Sub-Category</th>
                <th scope="col">Image</th>
                <th scope="col">Rating</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {listOfProducts.length > 0 &&
                listOfProducts.map((product, i) => (
                  <tr key={product._id} className="m-auto">
                    <th scope="row">{i + 1}</th>
                    <td>{product.code}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{product.category}</td>
                    <td>{product.subCategory}</td>
                    <td>
                      <img src={product.image} width={"80rem"} />
                    </td>
                    <td>{product.rating}</td>

                    <td onClick={(e) => editHandler(product)}>
                      <FaEdit size={25} style={{ fill: "blue" }} />
                    </td>
                    <td onClick={(e) => deleteHandler(product._id)}>
                      <MdDeleteForever size={25} style={{ fill: "red" }} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Products;
