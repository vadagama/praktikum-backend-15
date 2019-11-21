const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 
const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.getUser = (req, res) => {
    User.findById(req.params.id)
      .then(user => user ? res.send({ data: user }) : res.status(404).send({ "message": "Такого пользователя нет" }))
      .catch(err => res.status(500).send({"message": "На сервере произошла ошибка"}));
  };

module.exports.createUser = (req, res) => {
     bcrypt.hash(req.body.password,10)
      .then(hash =>  User.create({ 
        email: req.body.email, 
        password: hash, 
        name: req.body.name, 
        about: req.body.about, 
        avatar: req.body.avatar }))
      .then((user) => res.status(201).send(user))
      .catch(err => res.status(400).send({ message: err.message }));
  };

  module.exports.login = (req, res) => {
    const { email, password } = req.body;

    return User.findUserByCredentials(email, password)
        .then((user) => {
          const token = jwt.sign({_id: user._id}, "super-strong-secret", { expiresIn: "7d" });
          res.send({ token });
        })
        .catch((err) => {
            res.status(401).send({ message: err.message });
        });
};