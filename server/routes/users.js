const {
  getAllUsers,
  createUser,
  deleteUser,
  getUserById,
  updateUser,
  getUserProfile,
} = require("../controllers/users.controller");
const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);
router.route("/").get(getAllUsers).post(createUser);
router.route("/profile").get(getUserProfile);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
