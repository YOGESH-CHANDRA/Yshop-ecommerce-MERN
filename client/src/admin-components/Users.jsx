import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import API from "../api/api";
import Spinner from "../Spinner/Spinner";

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const token = localStorage.getItem("yshopToken");
  const getAllUsers = async () => {
    try {
      setLoading(true);
      const resp = await axios(`${API}/api/v1/user/allusers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(resp.status == 200){
        setLoading(false);
      setAllUsers(resp.data);
      }
      else{
        toast.error(resp.data)
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data);
      setLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    try {
      
      if(window.confirm("Want to delete user ? ")){
        console.log("id: ", id);
      setLoading(true);
      const resp = await axios.delete(`${API}/api/v1/user/delete-user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(resp.data.msg);
      getAllUsers();
      setLoading(false);
      }
    } catch (error) {
      toast.error("User not deleted with id :", id);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  console.log("a", allUsers);
  return (
    <div className="mx-auto row">
      <h2 className=" text-center bg-black text-white">Users List (Total Users : {allUsers.length})</h2>
      {!loading ? (
        <div className="table-responsive">
          <table className="table ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">User Name</th>
                <th scope="col">Email</th>
                <th scope="col">Admin?</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.length > 0 &&
                allUsers.map((user, i) => (
                  <tr key={user._id}>
                    <th scope="row">{i + 1}</th>
                    <td className="text-capitalize">
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin}</td>
                    <td onClick={(e) => deleteHandler(user._id)}>
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

export default Users;
