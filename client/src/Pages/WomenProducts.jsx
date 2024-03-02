import { useEffect } from "react";
import { useStore } from "../Context/ShopContext";

import ProductCard from "../ProductCard";

const WomenProducts = () => {
  const { getAllProducts, listOfProducts } = useStore();

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <section>
      <h1 className="text-center">Women Products</h1>

        <div className="text-center row">
          {listOfProducts.length > 0 &&
            listOfProducts.map((product, index) => (
                <span className="col-lg-3 col-md-6 col-sm-12 p-3 ">
                
                <ProductCard key={product._id} product={product} />
              </span>
            ))}
        </div>
      
    </section>
  );
};

export default WomenProducts;
