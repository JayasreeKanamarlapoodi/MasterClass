const express = require('express');
const {  validateUsers, createUser, getAllUsers } = require('../controllers/userController');
const authMiddleware = require('../controllers/authMiddleware');

const router = express.Router();

router.post('/validateusers', validateUsers);
router.post('/users', createUser);
router.get("/users",authMiddleware,getAllUsers);

module.exports = router;