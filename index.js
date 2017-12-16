var app = require('./shortly.js');
const env = require('dotenv').config({ path: '/Users/garethveitch/Documents/OpSpark/Immersion/Week-5/shortly-droplet'});

const port = process.env.PORT || 4568;
app.listen(port, function() {
  console.log('Shortly is listening on process.env.PORT ' + port);
});
