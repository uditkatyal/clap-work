const jwt = require('jsonwebtoken');
const Student = require('./../models/studentModel');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
// getting all the studemts
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({
      status: 'success',
      results: students.length,
      data: {
        students,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
// SignUp Students
exports.signUpStudent = async (req, res) => {
  try {
    const newStudent = await Student.create({
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      favTeacher: req.body.favTeacher,
    });
    const token = signToken(newStudent._id);
    res.status(200).json({
      status: 'success',
      token,
      data: {
        student: newStudent,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
// Login Students
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // 1) check if email and password exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }
    // 2) check if user exists && password is correct
    const student = await Student.findOne({ email }).select('+password');
    if (
      !student ||
      !(await student.correctPassword(password, student.password))
    ) {
      return next(new AppError('Incorrect email or password', 401));
    }
    // 3) if everything ok, send token to client
    const token = signToken(student._id);
    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
