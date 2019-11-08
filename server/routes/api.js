var express = require("express");
var router = express.Router();
var PersonController = require("../controllers/PersonController");
var BitcoinController = require("../controllers/BitcoinController");
var ShoppingController = require("../controllers/ShoppingController");

router.get("/peoples", PersonController.all);
router.get("/bitcoins", BitcoinController.all);
router.delete("/soldbitcoin", BitcoinController.soldBitcoin);
router.post("/registershopping", ShoppingController.register);
router.get("/listshopping/:userId", ShoppingController.list);
//router.get("/products", ProductController.all);

module.exports = router;
