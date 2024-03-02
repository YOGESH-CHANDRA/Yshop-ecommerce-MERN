import banner from "../Images/Banner/banner.jpg";
import "./HomeCover.css";

function HomeCover() {
  return (
    <div className="HomeCover ">
      {/* <!-- banner section  --> */}
      <div className="banner position-relative">
        <img src={banner} alt="banner" className="w-100" height={300} />
        <div className="slogan text-white position-absolute fw-bolder">
          <h1>
            <i>
              <span style={{ color: "#8F0101" }}>Y</span>shop
            </i>
          </h1>
          <p>
            Clothes that talk on behalf of you. Something for every occassion.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeCover;
