const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.put("/updateuser", AuthController.update);

//router.get( '/user',AuthController.user_data);

module.exports = router;
