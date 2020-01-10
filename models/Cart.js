const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  ProductId: {
    type: Schema.Types.ObjectId,
    ref: "products"
  }
});

module.exports = Cart = mongoose.model("cart", CartSchema);
