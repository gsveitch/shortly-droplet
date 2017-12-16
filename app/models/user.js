var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');



var User = db.Model.extend({
  tableName: 'users',
  clicks: () => {
    // return this.hasMany(Click);

  },
  // bothers references input field username/password
  // password references password from input field
  // not sure what will happen here but ultimately will allow functionality. maybe check for authentication?
  initialize: function() {
    this.on('creating', this.hashPassword);
    // this.on('signup', (user) => {
    //   if (!user) {
    //     console.log('no user in user');
    //   }
    // });
  },
  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), (err, isMatch) => {
      callback(isMatch);
    });
  },
  hashPassword: function() {
    var cipher = Promise.promisify(bcrypt.hash);

    return cipher(this.get('password'), null, null)
      .bind(this)
      .then((hash) => {
        this.set('password', hash);
      });
  }
});

module.exports = User;