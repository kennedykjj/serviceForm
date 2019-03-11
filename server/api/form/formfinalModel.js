var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FormSchema = new Schema({
  productId: {
    type: Number,
    required: true
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  cpf: {
    type: String
  },
  birthdate: {
    type: Date,
    default: Date.now
  },
  phone: {
    type: String
  },
  insertiondate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('formFinal', FormSchema);
