const Teacher = require('./../models/teacherModel');

exports.getAllTeachers = async (req, res) => {
  try {
    const Teachers = await Teacher.find();
    res.status(200).json({
      status: 'success',
      data: {
        Teachers,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.newTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        teacher,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.famousTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.aggregate([
      {
        $sort: { popularityScore: -1 },
      },
      {
        $limit: 1,
      },
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        teacher,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
