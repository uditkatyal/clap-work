const express = require('express');
const app = express();

const teacherRoute = require('./routes/teacherRoute');
const studentRoute = require('./routes/studentRoute');

app.use(express.json());

app.use('/api/v1/teachers', teacherRoute);
app.use('/api/v1/student', studentRoute);
module.exports = app;
