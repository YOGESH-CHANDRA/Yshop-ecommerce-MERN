import { useEffect } from "react";
import { useStore } from "../Context/ShopContext";

import ProductCard from "../components/ProductCard";

const Allproducts = () => {
  const { getAllProducts, listOfProducts, setCartItems } = useStore();

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <section>
      <h1 className="text-center text-capitalize text-decoration-underline">
        All Products
      </h1>
      <div className="d-flex justify-content-between col-5"></div>
      <div className="text-center row m-auto">
          {listOfProducts.length > 0 &&
            listOfProducts.map((product, index) => (
                <span className="col-lg-3 col-md-6 col-sm-12 text-capitalize">
                
                <ProductCard key={product._id} product={product} />
              </span>
            ))}
         </div>
    </section>
  );
};

export default Allproducts;
