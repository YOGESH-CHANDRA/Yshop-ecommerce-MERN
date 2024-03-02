import { useEffect } from "react";
import { useStore } from "../Context/ShopContext";

import ProductCard from "../components/ProductCard";

const Category = (props) => {
  const { getAllProducts, listOfProducts, setCartItems } = useStore();
  const products = listOfProducts &&  listOfProducts.filter(
    (product, index) => product.category == props.category
  );

  useEffect(() => {
    getAllProducts();
  }, [props]);

  return (
    <section>
      <h1 className="text-center text-capitalize text-decoration-underline">
        Category : {props.category}
      </h1>
      <div className="d-flex justify-content-between col-5"></div>
      <div className="text-center row m-auto">
        {products.length?
          products.map((product, index) => (
            <span className="col-lg-3 col-md-6 col-sm-12 p-3 ">
              <ProductCard key={product._id} product={product} />
            </span>
          ))
          :<h3 className="text-danger">Products Not Available</h3>
        }
      </div>
    </section>
  );
};

export default Category;
