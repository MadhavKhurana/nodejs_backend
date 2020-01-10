const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  //   user: {
  //     type: Schema.Types.ObjectId,
  //     ref: "users"
  //   },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  picture: {
    type: String
  }
});

module.exports = Product = mongoose.model("products", ProductSchema);
