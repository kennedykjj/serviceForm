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
  sessionId:
  {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('formPartial', FormSchema);
