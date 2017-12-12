var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');



var User = db.Model.extend({
  tableName: 'users',
  clicks: function() {
    // return this.hasMany(Click);

  },
  // bothers references input field username/password
  // password references password from input field
  // not sure what will happen here but ultimately will allow functionality. maybe check for authentication?
  initialize: function() {
    this.on('signup', (user) => {
      if (!user) {
        console.log('no user in user');
      }
    });
  }
});

module.exports = User;