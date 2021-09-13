const router = require("express").Router();
const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductByName,
  getProductReviews,
  createProductReview,
  updateProductReview,
} = require("../controllers/products.controller");
const verifyToken = require("../middleware/verifyToken");

router
  .route("/")
  .get(verifyToken, getAllProducts)
  .post(verifyToken, createProduct);

router
  .route("/:id")
  .get(getProduct)
  .get(getProductByName)
  .put(verifyToken, updateProduct)
  .delete(verifyToken, deleteProduct);

router
  .route("/:id/reviews")
  .get(getProductReviews)
  .post(verifyToken, createProductReview)
  .put(verifyToken, updateProductReview);

module.exports = router;
