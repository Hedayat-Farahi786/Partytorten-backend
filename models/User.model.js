const mongoose = require("mongoose");



const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String
    },
    phone: {
      type: String
    },
    createdAt: {
        type: String
    },
    orders: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    }],
  });


const User = mongoose.model('User', UserSchema);

module.exports = User;