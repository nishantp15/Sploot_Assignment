const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    gender: String,
    password: String,
    image: String,
    githubUsername:String,
    signinMethod:String,
    
  },
  { timestamps: true }
);

const user = mongoose.model('user', userSchema);

module.exports = {user}