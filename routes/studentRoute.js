const express = require('express');
const router = express.Router();
const studentController = require('./../controllers/studentController');

router.route('/').get(studentController.getAllStudents);
router.route('/signup').post(studentController.signUpStudent);
router.route('/login').post(studentController.login);

module.exports = router;
