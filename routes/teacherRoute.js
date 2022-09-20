const express = require('express');
const router = express.Router();

const teacherController = require('./../controllers/teacherControllers');

router.route('/most-fav-teacher').get(teacherController.famousTeacher);
router
  .route('/')
  .get(teacherController.getAllTeachers)
  .post(teacherController.newTeacher);

module.exports = router;
