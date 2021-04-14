const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  manufacturer: {type: String, required: true},
  mainPepper: {type: String, required: true},
  heat: {type: String, required: true},
  likes:{type: Number, required: true},
  dislikes:{type: Number, required: true},
  userLiked: {type: String, required: true},
  userDisliked: {type: String,require: true}
});

module.exports = mongoose.model('Sauce', sauceSchema);