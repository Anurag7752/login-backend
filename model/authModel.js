const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

// Static method to login user
userSchema.statics.login = async function(email, password) {
  console.log(`Attempting to login with email: ${email}`); // Debugging line
  const user = await this.findOne({ email });
  console.log(`User found: ${user}`); // Debugging line
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const User = mongoose.model('user', userSchema);
module.exports = User;
