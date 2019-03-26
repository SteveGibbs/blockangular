const express = require("express");
const checkAuth = require('../middleware/check-auth');

const UserController = require('../controllers/user');

const router = express.Router();



router.post("/signup", UserController.createUser);

router.post("/login", UserController.loginUser);

router.get("",
  UserController.getUsers
);

router.get("/:id",
  UserController.getUser
);

router.post(
  "",
  UserController.createUser
)

router.put("/:id",
  UserController.updateUser
)

router.delete("/:id",
  UserController.deleteUser
);

module.exports = router;
