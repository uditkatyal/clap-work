// A script to transfer data from json file to MongoDb

const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const Teacher = require('./../../models/teacherModel');

const data = JSON.parse(
  fs.readFileSync(`${__dirname}/teachersList.json`, 'utf-8')
);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
(async (req, res) => {
  try {
    const status = await mongoose.connect(DB);
    console.log('Database Connected');
  } catch (err) {
    console.log(err);
  }
})();

// IMPORT DATA FROM FILE
const importTeacherData = async (req, res) => {
  try {
    await Teacher.create(data);
    console.log('Data Successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE DATA FROM THE DATABASE

const deleteTeacherData = async (req, res) => {
  try {
    await Teacher.deleteMany();
    console.log('Data Successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.argv[2] === '--importTeacherData') {
  importTeacherData();
} else if (process.argv[2] === '--deleteTeacherData') {
  deleteTeacherData();
}
