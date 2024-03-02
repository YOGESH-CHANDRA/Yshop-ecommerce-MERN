import React, { useEffect, useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import API from "../api/api";
import Spinner from "../Spinner/Spinner";

const Orders = () => {
  const [ordersList, setOrdersList] = useState([]);
  const token = localStorage.getItem("yshopToken");
  const [loading, setLoading] = useState(false);

  const getAllOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/api/v1/order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      setOrdersList(data);
    } catch (error) {
      toast.error(error.response.data);
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      // console.log(orderId,status)
      setLoading(true);
      const resp = await axios.patch(
        `${API}/api/v1/order`,
        {
          orderId,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      if (resp.status == 200) {
        toast.info("Order status update succesfully");
        getAllOrders();
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
    <div className="mx-auto w-lg-75 w-md-100">
      <h2 className="text-center bg-black text-white">
        Orders List ( Total Orders : {ordersList.length} )
      </h2>
      {!loading?  
      <div className="table-responsive">
        <table className="table w-50 m-auto w-md-100 text-center text-capitalize">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">OrderId</th>
              <th scope="col">Customer Id</th>
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
                  <td>{order.custId}</td>
                  <td>{order.items}</td>
                  <td>{order.amount}</td>
                  <td>{order.shippingAddress}</td>
                  <td>{order.deliveryStatus} </td>
                  <td className="text-capitalize">
                    <select
                      name="deliveryStatus"
                      id="deliveryStatus"
                      value={order.deliveryStatus}
                      onChange={(e) =>
                        updateStatus(order.orderId, e.target.value)
                      }
                    >
                      <option value="underprocess">Underprocess</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
    </div>:<Spinner/>}
    </div>
  );
};

export default Orders;
