var mongoose = require("mongoose");
var faker = require("faker");

var BitcoinModel = require("../models/BitcoinModel");

mongoose.connect("mongodb://arthur:arthur@192.168.99.101:27017/admin", {
  useNewUrlParser: true
});

async function add(n) {
  try {
    for (let i = 0; i < n; i++) {
      const b = new BitcoinModel();
      b.coin = 'Bitcoin';
      b.amount = Math.floor(Math.random() * 6) + 1;
      b.price = faker.commerce.price();
      await b.save();
    }
  } catch (err) {
    console.log(err);
  }
}

add(10).then(() => {
  console.log("OK");
  mongoose.disconnect();
});
