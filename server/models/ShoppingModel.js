var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ShoppingSchema = new Schema({
  'id_user': String,
  'coin': String,
  'amount':String,
  'price': String,

});


module.exports = mongoose.model('Shopping', ShoppingSchema);