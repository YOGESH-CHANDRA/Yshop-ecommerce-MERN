const ProductModel = require("../models/product.model");
const uplaodOnCloudinary = require("../utils/cloudinary");

// find all product
const getAllProduct = async (req, res) => {
  try {
    const allProduct = await ProductModel.find().sort({ code: 1 });
    res.status(200).json(allProduct);
  } catch (error) {
    res.status(400).json({ msg: "Product not found || Empty ", error });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const signleProduct = await ProductModel.findOne({ _id });
    res.status(200).send(signleProduct);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};


// Bulk upload product with image url
// const addProduct = async (req, res) => {
// //   const { code, name, price, quantity, category, subCategory, image, rating } =
// //     req.body;
//   try {
// //     if (
// //       !code ||
// //       !name ||
// //       !price ||
// //       !quantity ||
// //       !category ||
// //       !subCategory ||
// //       !image
// //     ) {
// //       throw new Error("All important details required");
// //     }
//     console.log(req.body);
//     // const isProduct = await ProductModel.findOne({ code });
//     // if (isProduct) {
//     //   throw new Error(`Product with code ${code} is already entered`);
//     //   return;
//     // }
//     const newProduct = await ProductModel.create(req.body);
//     res.status(201).json({ msg: "New product added", Product: newProduct });
//   } catch (error) {
//     res.status(400).json({ msg: error.message });
//   }
// };




// add single product 
const addProduct = async (req, res) => {
  const {
    code,
    name,
    price,
    quantity,
    category,
    description,
    subCategory,
    rating,
  } = req.body;
  const { isAdmin } = req.user;
  // console.log(isAdmin);
  try {
    if (isAdmin != "true") {
      return res.status(403).send("Unauthorized access");
    }
    const imageUrl = await uplaodOnCloudinary(req.file.path);
    // console.log("file upload on :", imageUrl)

    if (
      !code ||
      !name ||
      !price ||
      !quantity ||
      !description ||
      !category ||
      !subCategory ||
      !imageUrl
    ) {
      return res.json({ msg: "All important details required" });
    }

    // console.log("test", req.body, imageUrl);

    const isProduct = await ProductModel.findOne({ code });
    if (isProduct) {
      return res.json({ msg: `Product with code ${code} is already entered` });
    }
    const newProduct = await ProductModel.create({
      code,
      name,
      price,
      quantity,
      category,
      description,
      subCategory,
      rating,
      image: imageUrl,
    });
    return res
      .status(201)
      .json({ msg: "New product added", product: newProduct });
  } catch (error) {
    return res.status(500).json({ msg: "error.message" });
  }
};

// delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { isAdmin } = req.user;
  try {
    if (isAdmin != "true") {
      return res.status(403).send("Unauthorized access");
    }
    const deletedProduct = await ProductModel.findByIdAndDelete({ _id: id });
    // console.log(deletedProduct);
    if (!deletedProduct) {
      res.send("Product not deleted || found");
    }
    res
      .status(200)
      .json({ msg: "Product deleted successfully", deletedProduct });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// update product using put method
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { isAdmin } = req.user;
  const {
    code,
    name,
    price,
    quantity,
    category,
    description,
    subCategory,
    rating,
  } = req.body;
  try {
    if (isAdmin != "true") {
      return res.status(403).json({msg:"Unauthorized access"});
    }
   
    const imageUrl = await uplaodOnCloudinary(req.file.path);
    if (
      !code ||
      !name ||
      !price ||
      !quantity ||
      !description ||
      !category ||
      !subCategory ||
      !imageUrl
    ) {
      return res.status(400).json({msg:"All field details required"});
    }


    // console.log(req.body);
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          code,
          name,
          price,
          quantity,
          category,
          subCategory,
          description,
          image: imageUrl,
          rating,
        },
      },
      { new: true }
    );
    // console.log(updatedProduct.code);
    res
      .status(200)
      .json({ msg: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error"});
  }
};

module.exports = {
  addProduct,
  getSingleProduct,
  getAllProduct,
  deleteProduct,
  updateProduct,
};
