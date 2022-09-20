const mongoose = require('mongoose');
const teacherSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name of teacher is required'],
  },
  email: {
    type: String,
    required: [true, 'Email of teacher is required'],
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number of teacher is required'],
  },
  password: {
    type: String,
    required: [true, 'Password of teacher is required'],
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
  subjects: {
    type: [String],
  },
  // is used to find out the most fav teacher by students
  popularityScore: {
    type: Number,
    default: 0,
  },
  joiningDate: {
    type: Date,
    default: Date.now(),
  },
});

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;
