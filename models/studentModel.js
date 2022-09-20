const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name of student is required'],
  },
  email: {
    type: String,
    required: [true, 'Email of student is required'],
    unique: true,
    lowercase: true,
    // validate: [validateEmail, 'Please fill a valid email address'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number of student is required'],
  },
  password: {
    type: String,
    required: [true, 'Password of student is required'],
    select: false, // sensitive data not visible to client side
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      messages: {
        message: 'Password and Confirm Password must be same',
      },
    },
  },
  favTeacher: {
    type: String,
    required: [true, 'FavTeacher of teacher is required'],
  },
  // is used to find out the most fav teacher by students
});

studentSchema.pre('save', async function (next) {
  // only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

studentSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
