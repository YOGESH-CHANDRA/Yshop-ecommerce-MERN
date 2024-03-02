import { FaCartShopping } from "react-icons/fa6";
import { TiChevronLeft , TiChevronRight } from "react-icons/ti";


// import Products from "../Products";
import ProductCard from "./ProductCard";
import "./Slider.css";
import React, { useEffect, useState } from "react";
import { useStore } from "../Context/ShopContext";

function Slider() {
  const [counter, setCounter] = useState(0);
  const {getAllProducts,listOfProducts,setListOfProducts} =useStore();
 
const Products = listOfProducts.slice(0,10);



  
  // logic for responsive carousel slider
 
  let cards = document.querySelectorAll(".card");
  let screenWidth = window.innerWidth;

  const cardX = (screenWidth) => {
    cards.forEach((card, i) => {
      if (screenWidth > 768) {
        card.style.left = `${(i * screenWidth) / 4}px`;
        card.style.width = `${screenWidth / 4}px`;
      } else if (screenWidth < 577) {
        card.style.left = `${i * screenWidth}px`;
        card.style.width = `${screenWidth}px`;
      } else {
        card.style.left = `${(i * screenWidth) / 2}px`;
        card.style.width = `${screenWidth / 2}px`;
      }
    });
  };

  cardX(screenWidth);

  function reportWindowSize() {
    screenWidth = window.innerWidth;
    cardX(screenWidth);
  }

  window.onresize = reportWindowSize;

  const goPrev = () => {
    if ((counter) => 0) {
      slideImage();
      // counter--;
      setCounter((counter) => counter - 1);
    }
  };
  const goNext = () => {
    if (
      (counter == cards.length - 3 && screenWidth > 768) ||
      (counter == cards.length - 1 &&
        (screenWidth < 769 || screenWidth > 576)) ||
      (counter == cards.length && screenWidth < 577)
    ) {
      setCounter((counter) => 0);
    } else {
      slideImage();
      setCounter((counter) => counter + 1);
    }
  };

  const slideImage = () => {
    cards.forEach((card) => {
      card.style.transform = `translateX(-${counter * 100}%)`;
    });
  };


  useEffect(() => {

    getAllProducts(); 
    // setCounter(()=>setCounter(counter+1));
    setTimeout(goNext,1000);
 }, []);
  // Return the slider component
  return (
    <div className="slider">
      <div className="slide-section  bg-secondary-subtle">
        <h1 className="text-center py-2">Featured Products</h1>
        <div className="silder-container position-relative ">
          <div className="slider  text-center">
            {Products.length>0 && Products.map((product) => (

              <div className="card">
                <ProductCard key={product._id} product={product} />
              </div>
            ))}
          </div>
          <div className="dir">
            <button className="control-prev left" onClick={goPrev}>
              <TiChevronLeft  />
            </button>
            <button className="control-next right" onClick={goNext}>
              <TiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;
