const express = require('express');
const router = express.Router();

const teacherController = require('./../controllers/teacherControllers');

router
  .route('/api/v1/teacher')
  .get(teacherController.getAllTeachers)
  .post(teacherController.newTeacher);

module.exports = router;
