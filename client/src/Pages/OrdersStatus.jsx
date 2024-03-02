import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/api";
import Spinner from "../Spinner/Spinner";

const OrdersStatus = () => {
  const [ordersList, setOrdersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("yshopToken");

  const getAllOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/api/v1/order/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      setOrdersList(data);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    // console.log(orderId, status);
    try {
      if (status !== "canceled") {
        setLoading(true);
        const resp = await axios.patch(
          `${API}/api/v1/order`,
          { orderId, status: "canceled" },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false);
        // console.log(resp.status==200);
        if (resp.status == 200) {
          toast.info("Order cancel succesfully");
          getAllOrders();
          setLoading(false);
        }
      } else {
        toast.info("Order already canceled");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <div className="mx-auto w-100">
      <h2 className="text-center bg-black text-white">
        Orders List ( Total products : {ordersList.length} )
      </h2>
      {!loading ? (
        <div className="table-responsive">
          <table className="table text-center text-capitalize">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">OrderId</th>

                <th scope="col">Items (no.)</th>
                <th scope="col">Price</th>
                <th scope="col">Address</th>
                <th scope="col">Status</th>
                <th scope="col">Update Status</th>
              </tr>
            </thead>
            <tbody>
              {ordersList.length > 0 &&
                ordersList.map((order, i) => (
                  <tr key={order._id} className="m-auto">
                    <th scope="row">{i + 1}</th>
                    <td>{order.orderId}</td>

                    <td>{order.items}</td>
                    <td>{order.amount}</td>
                    <td>{order.shippingAddress}</td>
                    <td>{order.deliveryStatus} </td>
                    <td className="text-capitalize">
                      <button
                        className="btn btn-danger"
                        value={order.deliveryStatus}
                        onClick={(e) =>
                          updateStatus(order.orderId, order.deliveryStatus)
                        }
                      >
                        Cancel
                      </button>
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

export default OrdersStatus;
