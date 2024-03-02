import { FaShoppingCart } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../Images/logo.png";
import "./Header.css";
import { useEffect, useState } from "react";
import { useStore } from "../Context/ShopContext";

import { toast } from "react-toastify";

function Header() {
  const [search, setSearch] = useState("");

  const { token, setToken, cartItems, admin, setAdmin } = useStore();
  const navigate = useNavigate();

  // console.log(token);
  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/search/${search}`);
    setSearch("");
  }
  const signOut = () => {
    localStorage.removeItem("yshopToken");
    localStorage.removeItem("isAdmin");
    setAdmin(null);
    setToken(null);
    toast.success("Logout Successfully");
  };

  useEffect(() => {
    setToken(localStorage.getItem("yshopToken"));
  }, [signOut]);

  return (
    <div className="header">
      {/* <!-- Header first section --> */}
      <nav className="navbar navbar-expand-lg navbar-light bg-secondary py-0 ">
        <div className="container-fluid d-flex flex-lg-row flex-md-column">
          <Link className="navbar-brand text-light " to="/">
            <img src={logo} alt="logo" srcset="" className="logo " />
            <span className="brand-name">
              <b>
                <i>
                  <span className="bname">Y</span>shop
                </i>
              </b>
            </span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse col-2"
            id="navbarSupportedContent"
          >
            <form
              className="m-auto d-flex col-lg-5 col-md-12"
              onSubmit={handleSubmit}
            >
              <input
                className="form-control "
                type="text"
                placeholder="Product name, Category name, etc"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-outline-light search" type="submit">
                Search
              </button>
            </form>
            <div className="text-center col-lg-4 col-md-12 my-2 d-flex justify-content-end ">
              {!token ? (
                <>
                  <NavLink
                    to="/login"
                    className="btn text-center btn-outline-light btn-nav"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="btn text-center btn-outline-light btn-nav "
                  >
                    Sign Up
                  </NavLink>
                </>
              ) : (
                <>
                  <h1 className="btn  text-uppercase text-white border border-white">
                    {localStorage.getItem("user")}
                  </h1>
                  {admin == "true" ? (
                    <NavLink
                      to="/admin"
                      className="btn text-center btn-outline-light btn-nav "
                    >
                      Admin
                    </NavLink>
                  ) : null}
                  <NavLink
                    to="/orders"
                    className="btn text-center btn-outline-light btn-nav"
                  >
                    Orders
                  </NavLink>
                  <NavLink
                    to="/login"
                    onClick={signOut}
                    className="btn text-center btn-outline-light btn-nav "
                  >
                    LogOut
                  </NavLink>
                </>
              )}

              <NavLink to="/cart" className="d-flex cart">
                <FaShoppingCart className="cart-icon" />
                <div className="count">{cartItems.length}</div>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* <!-- Header second section --> */}
      <ul className="nav justify-content-center bg-warning-subtle border border-1">
        <li className="nav-item">
          <Link className="nav-link active" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/allproducts">
            All Product
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/men">
            Men
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/women">
            Women
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/kids">
            Kids
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
