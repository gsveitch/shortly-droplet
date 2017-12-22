var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

var linkSchema = mongoose.Schema({
  visits: Number,
  link: String,
  title: String,
  code: String,
  baseUrl: String,
  url: String
});

var createSha = function (url) {
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
};

linkSchema.pre('save', function (next) {
  var code = createSha(this.url);
  console.log('addning code in save hook', code);
  this.code = code;
  next();
});

var Link = mongoose.model('Link', linkSchema);

module.exports = Link;