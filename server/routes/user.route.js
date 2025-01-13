const {
  createUser,
  allUsers,
  updateUser,
  getUserById,
} = require('../controllers/user.controller');
const upload = require('../utils/multer');

const router = require('express').Router();
router.get('/all', allUsers);
router.get('/:id', getUserById);
router.post('/', upload.single('image'), createUser);
router.put('/:id', upload.single('image'), updateUser);

module.exports = router;
