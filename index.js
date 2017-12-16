var app = require('./shortly.js');
const port = process.env.PORT || 4568;
app.listen(port, function() {
  console.log('Shortly is listening on process.env.PORT ' + port);
});
