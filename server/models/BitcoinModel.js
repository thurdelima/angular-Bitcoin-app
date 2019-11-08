var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BitcoinSchema = new Schema({
  'coin': String,
  'amount':String,
  'price': String,

});


module.exports = mongoose.model('Bitcoin', BitcoinSchema);
