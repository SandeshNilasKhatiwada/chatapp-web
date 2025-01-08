const { createUser } = require('../controllers/user.controller');
const upload = require('../utils/multer');

const router = require('express').Router();

router.post('/', upload.single('image'), createUser);
module.exports = router;
