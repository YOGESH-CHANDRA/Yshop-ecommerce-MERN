import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Cart from "./Pages/Cart";
import ProductDetail from "./Pages/ProductDetail";
import AdminDashboard from "./Pages/AdminDashboard";
import Users from "./admin-components/Users";
import Page404 from "./Pages/Page404";
import AdminProducts from "./admin-components/AdminProducts";
import AddProduct from "./admin-components/AddProduct";
import EditProduct from "./admin-components/EditProduct";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Allproducts from "./Pages/Allproducts";
import Category from "./Pages/Category";
import Checkout from "./Pages/Checkout";
import Contact from "./Pages/Contact";
import Search from "./Pages/Search";
import Orders from "./admin-components/Orders";
import Success from "./Pages/Success";
import Cancel from "./Pages/Cancel";
import OrdersStatus from "./Pages/OrdersStatus";
import Logout from "./Pages/logout";

const App = () => {
  return (
    <>
      <div className="app d-flex flex-column vh-100">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allproducts" element={<Allproducts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/men" element={<Category category={"men"} />} />
            <Route path="/women" element={<Category category={"women"} />} />
            <Route path="/kids" element={<Category category={"kids"} />} />
            <Route path="/product-detail/:id" element={<ProductDetail />} />
            <Route path="/search/:item" element={<Search />} />
            <Route path="/orders" element={<OrdersStatus />} />

            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<AdminDashboard />}>
              <Route path="users" element={<Users />} />
              <Route path="products" element={<AdminProducts />}></Route>
              <Route path="add-product" element={<AddProduct />}></Route>
              <Route path="orders" element={<Orders />}></Route>
              <Route path="edit-product/:id" element={<EditProduct />}></Route>
            </Route>
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
          <Footer />
        </BrowserRouter>
        <ToastContainer />
      </div>
    </>
  );
};

export default App;
