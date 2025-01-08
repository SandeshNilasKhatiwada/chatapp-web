const { default: mongoose } = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  dob: { type: Date, require: true },
  gender: { type: String, require: true },
  profile: { type: String, require: true },
  country: { type: String, require: true },
  phone: { type: String, require: true },
});

exports.User = mongoose.model('User', userSchema);
