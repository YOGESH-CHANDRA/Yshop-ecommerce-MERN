import React from "react";
import { useParams, Link } from "react-router-dom";
import { useStore } from "../Context/ShopContext";


const ProductDetail = () => {
  const { listOfProducts, addToCart } = useStore();
  const { id } = useParams();

  const item =
    listOfProducts.length > 0 && listOfProducts.find((item) => item._id == id);
  console.log(id);

  console.log(item);

  return (
    <div className="pdetail d-flex  m-lg-auto p-5 shadow-lg col-lg-6 col-md-12 row text-capitalize">
     
      <img
        src={item.image}
        className="rounded-5 img-fluid col-lg-4 col-md-12"
        height={100}
        width={100}
      />
      
      
      <div className="d-flex flex-column col-lg-8 col-md-12 pt-2 m-0">
        <h5 >Product Code: {item.code}</h5>
        <p>Product Name : {item.name}</p>
        <p>Category : {item.category}</p>
        <p>Sub-Category  :{item.subCategory}</p>
        <p>Rating : {item.rating}</p>
        <p>Description : {item.description}</p>
        <h5>Rs. {item.price} /-</h5>
      
        <button
          className="btn btn-danger col-lg-6 col-md-12 my-2 "
          onClick={() => addToCart(item)}
        >
          Add to Cart
        </button>
        <Link to="/cart"
          className="btn btn-danger col-lg-6 col-md-12 my-2 "
        >
          Go To Cart
        </Link>
      </div>
      
    </div>
  );
};

export default ProductDetail;
