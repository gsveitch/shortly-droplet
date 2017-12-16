var app = require('./shortly.js');
const env = require('dotenv').config();

const port = process.env.PORT || 80;
app.listen(port, function() {
  console.log('Shortly is listening on process.env.PORT ' + port + ' || ' + port);
});
