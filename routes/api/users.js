const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../../models/Users.js");

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ message: "Email already Exist" });
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              console.log(user);
              res.json(user);
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User Matched

        const payload = {
          id: user.id,
          username: user.username
        };

        //Sign Token
        jwt.sign(payload, "secret", { expiresIn: 3000000000 }, (err, token) => {
          console.log({
            success: true,
            user: {
              _id: user.id,
              username: user.username,
              email: user.email
            },
            jwt: "Bearer " + token
          });

          res.json({
            success: true,
            user: {
              _id: user.id,
              username: user.username,
              email: user.email
            },
            jwt: "Bearer " + token
          });
        });
      } else {
        return res.status(400).json({ message: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
