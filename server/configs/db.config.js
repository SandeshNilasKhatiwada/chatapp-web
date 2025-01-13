const mongoose = require('mongoose');

exports.connect_db = (db_uri) => {
  mongoose
    .connect(db_uri)
    .then(() => {
      console.log('Successfully connected to MongoDB');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });
};
