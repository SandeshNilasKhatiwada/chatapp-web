const express = require('express');
const app = express();

app.listen(4000, (err) => {
  err ? console.log(err) : console.log('Listening to port 4000');
});
