const express = require("express");
const {
  getAllProduct,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const upload = require("../middleware/multer.middleware");
const Auth = require("../middleware/Auth.middleware");

const router = express.Router();

router
  .route("/")
  .post(upload.single("image"), Auth, addProduct) //use multer middleware upload imaage of the product
  .get(getAllProduct);

router
  .route("/:id")
  .get(getSingleProduct)
  .put(upload.single("image"), Auth, updateProduct)
  .delete(Auth, deleteProduct);

module.exports = router;
