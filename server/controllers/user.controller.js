const asyncHandler = require('../middlewares/asyncHandler');
const { create } = require('../services/user.services');

exports.createUser = asyncHandler(async (req, res) => {
  const userData = req.body;
  userData.profile = 'users/' + req.file.filename;
  const user = create(userData);
  res
    .status(201)
    .json({ status: true, message: 'Created User Successfully ', data: user });
});
