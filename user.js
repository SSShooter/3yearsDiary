var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tydiary');
var userSchama = mongoose.Schema({
  username: {
    unique: true,
    type: String
  },
  lastupdate: String,
  data: {},
  list: [{
    rival: String,
    matchScore: String
  }]
});
userSchama.statics = {
  fetch: function (cb) {
    return this
      .find({})
      .exec(cb)
  },
  findById: function (id, cb) {
    return this
      .findOne({
        _id: id
      })
      .exec(cb)
  }
};
var userModel = mongoose.model('user', userSchama);
module.exports = userModel;