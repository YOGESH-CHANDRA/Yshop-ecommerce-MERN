import { FaCartShopping } from "react-icons/fa6";

import { Link, useNavigate } from "react-router-dom";
import "./ProductCard.css";
import { useStore } from "../Context/ShopContext";

// / product component
function ProductCard( {product} ) {
  const navigate =useNavigate();
  const {getAllProducts,listOfProducts,setListOfProducts,cartItems, setCartItems,addToCart} =useStore();

  const { _id,code, name, price, description, category, subCategory,image,rating } = product;


 

  return (
    <div className="productCard border border-1 text-capitalize" style={{borderRadius:20}}>
      <img src={image} className="productCard-img-top" alt="product image" />
      <div className="productCard-body">
        <h5 className="productCard-title text-capitalize">{code}</h5>
        <h4 className="productCard-title text-capitalize">{name}</h4>
        {/* <p className="productCard-text text-capitalize">{description}</p>
        <p className="productCard-text text-capitalize">{category}:{subCategory}</p> */}
        <h4 className="productCard-title">Rs. {price}</h4>
        <div className="mb-2"><button className="btn btn-primary detail mx-3" onClick={()=>navigate(`/product-detail/${_id}`)}>Detail</button>
        <button className="btn btn-danger add-cart" onClick={()=>addToCart(product)}>Add to cart </button></div>
      </div>
    </div>
  );
}

export default ProductCard;
