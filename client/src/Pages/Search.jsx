import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStore } from '../Context/ShopContext';
import ProductCard from '../components/ProductCard';

const Search = () => {
const {item}=useParams();
const [filterData, setFilterData] = useState([]);
const { getAllProducts, listOfProducts, setCartItems } = useStore();

useEffect(() => {
  const filteredData = () =>{
    const data = listOfProducts && listOfProducts.filter((p)=>p.description.toLowerCase().includes(item.toLowerCase()));
    setFilterData(data)
  }

  filteredData();
  
}, [item])



return (
<section>
      <h1 className="text-center text-capitalize text-decoration-underline ">
        Search based on <span className='text-danger'>{item}</span>
      </h1>
      <div className="d-flex justify-content-between col-5"></div>
      <div className="text-center row m-auto">
          {filterData.length?
            filterData.map((product, index) => (
                <span className="col-lg-3 col-md-6 col-sm-12 text-capitalize">
                
                <ProductCard key={product._id} product={product} />
              </span>
            )):<h2 className='text-danger m-auto'>Product not found</h2>}
         </div>
    </section>
)
}

export default Search