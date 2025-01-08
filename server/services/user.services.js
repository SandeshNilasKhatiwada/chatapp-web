const { User } = require('../models/user.modle');

exports.create = async (user) => {
  try {
    const newUser = new User(user);
    return newUser.save();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
