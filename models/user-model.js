const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  encryptedPassword: String,
  role: String
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
