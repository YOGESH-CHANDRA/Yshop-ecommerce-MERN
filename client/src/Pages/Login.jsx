import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/api";
import { useStore } from "../Context/ShopContext";
import Spinner from "../Spinner/Spinner";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAdmin, setToken } = useStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loginHandler = async (e) => {
    e.preventDefault();
    
    try {
      if (!email || !password) {
        return toast.info("Email and password required");
      }
      setLoading(true);
      const resp = await axios.post(`${API}/api/v1/user/login`, {
        email,
        password,
      });
      
      if (resp.status == 200) {
        localStorage.setItem("isAdmin", resp.data.isAdmin);
        localStorage.setItem("yshopToken", resp.data.token);
        localStorage.setItem("user", resp.data.firstName);
        setAdmin(resp.data.isAdmin);
        setToken(resp.data.token);
        setLoading(false);
      toast.success(resp.data.msg);
        return navigate("/");
      }
      else{
        toast.info(resp.data.msg);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container row m-auto d-flex justify-content-center py-5">
        <h1 className="text-center text-uppercase">Login Account</h1>
        {!loading ? (
          <form className="was-validated col-md-6 ">
            <div className="form-group ">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group ">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password "
                minLength={6}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <br />
            <button
              type="submit"
              className="btn btn-primary me-2"
              onClick={loginHandler}
            >
              Submit
            </button>
            <Link to="/register" className="m-auto mt-3">
              New User? Register here
            </Link>
          </form>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default Signin;
