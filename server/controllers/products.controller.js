const pool = require("../config");
const productService = require("../services/product.service");

const getAllProducts = async (req, res) => {
  const { page = 1 } = req.query;

  const products = await productService.getAllProducts(page);
  res.json(products);
};

const createProduct = async (req, res) => {
  const newProduct = await productService.addProduct(req.body);
  res.status(200).json(newProduct);
};

const getProduct = async (req, res) => {
  const product = await productService.getProductById(req.params);
  res.status(200).json(product);
};

const getProductByName = async (req, res) => {
  const product = await productService.getProductByName(req.params);
  res.status(200).json(product);
};

const updateProductQuantity = async (req, res) => {
  const { quantity } = req.body;
  const { id } = req.params;

  const updatedProduct = await productService.updateProductQuantity({
    quantity,
    id,
  });
  res.status(200).json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await productService.removeProduct(id);
  res.status(200).json(deletedProduct);
};

const getProductReviews = async (req, res) => {
  const { product_id, user_id } = req.query;
  try {
    // check if current logged user review exist for the product
    const reviewExist = await pool.query(
      "SELECT EXISTS (SELECT * FROM reviews where product_id = $1 and user_id = $2)",
      [product_id, user_id]
    );

    // get reviews associated with the product
    const reviews = await pool.query(
      `SELECT users.fullName as name, reviews.* FROM reviews
        join users
        on users.user_id = reviews.user_id
        WHERE product_id = $1`,
      [product_id]
    );
    res.status(200).json({
      reviewExist: reviewExist.rows[0].exists,
      reviews: reviews.rows,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const createProductReview = async (req, res) => {
  const { product_id, content } = req.body;
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      `INSERT INTO reviews(user_id, product_id, content)
       VALUES($1, $2, $3) returning *
      `,
      [user_id, product_id, content]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json(error.detail);
  }
};

const updateProductReview = async (req, res) => {
  const { content, id } = req.body;

  try {
    const result = await pool.query(
      `UPDATE reviews set content = $1 where id = $3 returning *
      `,
      [content, id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getProduct,
  createProduct,
  updateProductQuantity,
  deleteProduct,
  getAllProducts,
  getProductByName,
  getProductReviews,
  updateProductReview,
  createProductReview,
};
