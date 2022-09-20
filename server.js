const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
// IIFE -> Immediately Invoked Function Expression
(async (req, res) => {
  try {
    const status = await mongoose.connect(DB);
    console.log('Database Connected');
  } catch (err) {
    console.log(err);
  }
})();

app.listen(process.env.PORT, (req, res) => {
  console.log('Server is running on port 5000');
});
