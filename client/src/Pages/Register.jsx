import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/api";
import Spinner from "../Spinner/Spinner";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, repeatPassword } = user;
    if (!firstName || !lastName || !email || !password || !repeatPassword) {
      return toast.info("All field required");
    }

    // if (user.password != user.repeatPassword) {
    //   return toast.info("Repeat password not matched");
    // }

    try {
      setLoading(true);
      const resp = await axios.post(`${API}/api/v1/user/register`, user);
      setLoading(false);
      // console.log(resp);
      // console.log(resp.data);
      // console.log(resp.data.msg);
      if (resp.status == 201) {
        setUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          repeatPassword: "",
        });
        toast.success(resp.data);
        navigate("/login");
        setLoading(false);
      } else {
        
        toast.error(resp.data);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container row m-auto d-flex justify-content-center py-0">
        <h1 className="text-uppercase text-center ">Create an account</h1>
        {!loading ? (
          <form className=" was-validated col-md-6">
            <div className="form-group ">
              <label className="form-label" htmlFor="form3Example1cg">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="form3Example1cg"
                className="form-control "
                placeholder="Enter first name"
                value={user.firstName}
                required
                onChange={inputHandler}
              />
            </div>
            <div className="form-group ">
              <label className="form-label" htmlFor="form3Example11cg">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="form3Example11cg"
                className="form-control "
                placeholder="Enter last name"
                value={user.lastName}
                required
                onChange={inputHandler}
              />
            </div>
            <div className="form-group ">
              <label className="form-label" htmlFor="email">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control "
                placeholder="Enter email id"
                value={user.email}
                required
                onChange={inputHandler}
              />
            </div>
            <div className="form-group ">
              <label className="form-label" htmlFor="form3Example4cg">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="form3Example4cg"
                className="form-control "
                value={user.password}
                required
                placeholder="Password should be min 6 character"
                minLength={6}
                onChange={inputHandler}
              />
            </div>
            <div className="form-group ">
              <label className="form-label" htmlFor="form3Example4cdg">
                Repeat your password
              </label>
              <input
                type="password"
                name="repeatPassword"
                id="form3Example4cdg"
                className="form-control "
                value={user.repeatPassword}
                placeholder="Repeat Password"
                required
                onChange={inputHandler}
              />
            </div>
            <br />
            <button
              type="submit"
              className="btn btn-primary"
              onClick={submitHandler}
            >
              Submit
            </button>
            <Link to="/login" className="">
              Already register? Login here
            </Link>
          </form>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default Register;
