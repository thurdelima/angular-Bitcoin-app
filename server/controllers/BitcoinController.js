var BitcoinModel = require("../models/BitcoinModel");

module.exports = {
  all: function (req, res) {
    BitcoinModel.find({}).lean().exec(function (err, bitcoins) {
      if (err)
        return res.json([]);
      return res.json(bitcoins);
    })
  },

   soldBitcoin: async function (req, res) {
    //await BitcoinModel.updateOne({_id: id}, { $set: req});

    await BitcoinModel.deleteOne(req.body, function(err){
      if (!err) {
        
        return res.json(["message", "deleted success"]);
      }else {
        return res.json(["messageNot", "dont deleted"])
      }
    })
  }
}