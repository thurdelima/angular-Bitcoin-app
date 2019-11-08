var ShoppingModel = require("../models/ShoppingModel");

module.exports = {
  register: function (req, res) {
    try {
      const shopping = new ShoppingModel(req.body);
      shopping.save();
      return res.status(200).json(["shopping registred"]);
    
    } catch (e) {
      return res.status(500).json({ message: "Error save", error: e });
    }
  },

  list: function (req, res) {
    var param = req.params.userId;
    ShoppingModel.find({id_user: param}).lean().exec(function (err, shoppings) {
      if (err)
        return res.json([]);
      return res.json(shoppings);
    })
  }
}