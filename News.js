const mongoose = require('mongoose');
const db = 'mongodb+srv://CFOoi:8601@cluster0-wynk0.mongodb.net/News?retryWrites=true&w=majority';

mongoose
  .connect(
    process.env.MONGODB_URI||db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to database');
  })
  .catch(error => {
    console.log('Mongoose connetion error: ', error);
  });

const schema = new mongoose.Schema({
  search: { type: String },
  updated: {type: String}
});

module.exports.newsCollection = mongoose.model('newsCollection', schema, 'newsCollection');

