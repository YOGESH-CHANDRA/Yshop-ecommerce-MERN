import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast} from 'react-toastify';
import API from "../api/api";
import Spinner from "../Spinner/Spinner";

const EditProduct = () => {
  const [loading, setLoading] =useState(false);
const [code, setCode] = useState("");
const [name, setName] = useState("");
const [price, setPrice] = useState("");
const [quantity, setQuantity] = useState("");
const [category, setCategory] = useState("");
const [subCategory, setSubCategory] = useState("");
const [description, setDescription] = useState("");
const [image, setImage] = useState("");
const [rating, setRating] = useState("");

const {id}=useParams();

const updateHandler = async (e) => {
  e.preventDefault();
  
  const formData = new FormData();
  formData.append("code", code);
  formData.append("name", name);
  formData.append("price", price);
  formData.append("quantity", quantity);
  formData.append("category", category);
  formData.append("subCategory", subCategory);
  formData.append("description", description);
  formData.append("rating", rating);
  formData.append("image", image);

  try {
    // console.log(formData);
    setLoading(true)
    const token=localStorage.getItem("yshopToken");
    const resp = await axios.put(`${API}/api/v1/product/${id}`, formData,{headers:{
      'Authorization': `Bearer ${token}`
    }});
    toast.success(resp.data.msg);
    console.log(resp.data.product);
    setLoading(false)
  } catch (error) {
    console.log("error : ", error);
    toast.error(error.response.data.msg);
    setLoading(false)
  }
};

const editSetProduct = (product)=>{
  // console.log(product)
  setCode(product.code);
    setName(product.name);
    setPrice(product.price);
    setQuantity(product.quantity);
    setCategory(product.category);
    setSubCategory(product.setCategorytegory);
    setDescription(product.description);
    setRating(product.rating);
}

const getProduct= async()=>{
  try {
    setLoading(true)
    // console.log("id : ", id);
    const resp = await axios(`${API}/api/v1/product/${id}`);
    
    setLoading(false)
    // console.log("setproduct : ", product.code)
    editSetProduct(resp.data);
  } catch (error) {
   toast.error("error :", error.response.data);
   setLoading(false)
  }
}

useEffect(()=>{
  getProduct();
},[]);

return (
  <>
    <div className="mx-auto w-100">
      <h2 className="text-uppercase text-center bg-dark text-white">
        Edit Product
      </h2>

    {!loading?  <form className="col-md-8 m-auto was-validated">
        <label className="form-label" htmlFor="code">
          Product Code:
        </label>
        <input
          type="text"
          name="code"
          id="code"
          className="form-control "
          value={code}
          required
          onChange={(e) => setCode(e.target.value)}
          readOnly
        />

        <label className="form-label" htmlFor="product-name">
          Product Name
        </label>
        <input
          type="text"
          name="product-name"
          id="product-name"
          className="form-control "
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />

        <label className="form-label" htmlFor="rate">
          Rate (Rs.):
        </label>
        <input
          type="number"
          name="rate"
          id="rate"
          className="form-control "
          value={price}
          required
          onChange={(e) => setPrice(e.target.value)}
        />
        <label className="form-label" htmlFor="description">
          Description
        </label>
        <input
          type="text"
          name="description"
          id="description"
          className="form-control "
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="form-label" htmlFor="quantity">
          Quantity (Nos)
        </label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          className="form-control "
          value={quantity}
          required
          onChange={(e) => setQuantity(e.target.value)}
        />

        <label className="form-label" htmlFor="category">
          Category
        </label>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => setCategory(e.target.value)}
        >
          {/* <option selected>Open this select menu</option> */}
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>
        <label className="form-label" htmlFor="subcategory">
          Sub-Category
        </label>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => setSubCategory(e.target.value)}
        >
          {/* <option selected>Open this select menu</option> */}
          <option value="dress">Women : Dress</option>
          <option value="pants">Women/men: Pants</option>
          <option value="skirts">Women : Skirts</option>
          <option value="shirts">Men : Shirts</option>
          
          <option value="hoodies">Men : Hoodies</option>
          <option value="kids">Kids : Kids</option>
        </select>
        <label htmlFor="formFile" className="form-label">
          Upload product image <span className="text-danger">Mandatory</span>
        </label>
        <input
          className="form-control"
          type="file"
          id="formFile"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label className="form-label" htmlFor="rating">
          Rating
        </label>
        <input
          type="number"
          name="rating"
          id="rating"
          className="form-control "
          value={rating}
          min={0}
          max={5}
          required
          onChange={(e) => setRating(e.target.value)}
        />
        <br />
        <button
          type="submit"
          className="btn btn-primary me-2"
          onClick={updateHandler}
        >
          Update Product
        </button>
        <Link to="/admin/products">Go to admin product page</Link>
      </form>:<Spinner/>}
    </div>
  </>
);
};

export default EditProduct;
