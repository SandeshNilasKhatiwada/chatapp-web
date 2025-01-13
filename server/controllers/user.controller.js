const asyncHandler = require('../middlewares/asyncHandler');
const {
  create,
  allUser,
  update,
  getUserById,
} = require('../services/user.services');
const { deleteFile } = require('../utils/deleteFile');
const bcrypt = require('bcrypt');

exports.createUser = asyncHandler(async (req, res) => {
  const userData = req.body;

  const salt = await bcrypt.genSalt(10);
  userData.password = await bcrypt.hash(userData.password, salt);

  if (req.file) {
    userData.profile = 'users/' + req.file.filename;
  }
  const user = await create(userData);
  res
    .status(201)
    .json({ status: true, message: 'Created User Successfully ', data: user });
});

exports.updateUser = asyncHandler(async (req, res) => {
  const userData = req.body;
  const { id } = req.params;
  const getUser = await getUserById(id);
  if (getUser) {
    if (req.file) {
      deleteFile(getUser.profile);
      userData.profile = 'users/' + req.file.filename;
    }
    const updatedUser = await update(id, userData);
    res.status(200).json({
      status: true,
      message: 'Uses data updated',
      data: updatedUser,
    });
  } else {
    throw 'User Not Found';
  }
});

exports.allUsers = asyncHandler(async (req, res) => {
  const fetchedUsers = await allUser();
  res.status(200).json({
    status: true,
    message: 'Fetched All Users Successfully ',
    data: fetchedUsers,
  });
});

exports.getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const fetchedUsers = await getUserById(id);
  res.status(200).json({
    status: true,
    message: 'Fetched All Users Successfully ',
    data: fetchedUsers,
  });
});
