const express = require('express');
const {  validateUsers, createUser } = require('../controllers/userController');

const router = express.Router();

router.post('/validateusers', validateUsers);
router.post('/users', createUser);

module.exports = router;