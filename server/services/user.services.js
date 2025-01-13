const { User } = require('../models/user.modle');

exports.create = async (user) => {
  const newUser = await new User(user);
  return newUser.save();
};

exports.update = async (userId, userData) => {
  const updatedUser = await User.findByIdAndUpdate(
    { _id: userId },
    { $set: userData },
    { new: true },
  );
  return updatedUser;
};

exports.allUser = async () => {
  const allUser = await User.find({}, '-password');
  return allUser;
};

exports.getUserById = async (userId) => {
  const user = await User.findOne({ _id: userId }, '-password');
  return user;
};
