const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: 8
    },
    name: {
        type: String,
        required: false,
        minlength: 2,
        maxlength: 30
    },
    about: {
        type: String,
        required: false,
        minlength: 2,
        maxlength: 30
    },
    avatar: {
        type: String,
        required: false
    },
});

userSchema.statics.findUserByCredentials = function (email, password) {
    return this.findOne({ email }).select("+password")
      .then((user) => {
        if (!user) {
          return Promise.reject(new Error("Неправильные почта или пароль"));
        }
  
        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              return Promise.reject(new Error("Неправильные почта или пароль"));
            }
  
            return user;
          });
      });
  };

module.exports = mongoose.model("user",userSchema);