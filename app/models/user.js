const { hashSync, compareSync, genSaltSync } = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { EXPRESS_SECRET } = require('../config/env');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // normalized_email: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    // phone: {
    //   type: String,
    //   required: false,
    // },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    // avatar: {
    //   type: String,
    //   default: 'default-avatar.png',
    // },
    role: {
      type: String,
      enum: ['User', 'admin'],
      required: false,
    },
    // extra1: {
    //   type: String,
    //   required: true,
    // },
    // resetPasswordToken: {
    //   type: String,
    //   required: false,
    // },
    // resetPasswordExpires: {
    //   type: Number,
    //   required: false,
    // },
    // lastLogin: {
    //   type: Date,
    // },
    // ip: {
    //   type: String,
    // },
  },
  { timestamps: true, usePushEach: true }, // UTC format
);

userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    // this.extra1 = this.password;
    this.password = this._hashPassword(this.password);
    return next();
  }
  return next();
});

userSchema.pre('findOneAndUpdate', function(next) {
  const query = this;
  const update = query.getUpdate();
  if (update.password) {
    update.extra1 = update.password;
    update.password = hashSync(update.password, genSaltSync(8), null);
    return next();
  }
  return next();
});

userSchema.methods = {
  authenticateUser(password) {
    return compareSync(password, this.password);
  },

  _hashPassword(password) {
    return hashSync(password, genSaltSync(8), null);
  },

  createToken() {
    return jwt.sign(
      {
        id: this._id,
        name: this.name,
        email: this.email,
      },
      EXPRESS_SECRET,
      { expiresIn: 5184000 },
    );
  },

  toAuthJSON() {
    return {
      id: this._id,
      name: this.name,
      email: this.email,
      token: `${this.createToken()}`,
    };
  },

  toJSON() {
    return {
      id: this._id,
      name: this.name,
      email: this.email,
      // phone: this.phone,
      // avatar: this.avatar,
    };
  },
};
module.exports = mongoose.model('users', userSchema);