var app = require('./shortly.js');
require('dotenv').config();


if (process.env.NODE_ENV === 'development') {
  var port = process.env.PORT || 9000;
} else {
  var port = process.env.PORT || 80;
}
// const port = process.env.PORT || 80;
app.listen(port, function() {
  console.log('Shortly is listening on process.env.PORT ' + port + ' || ' + port);
});
