const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require('../models/user');

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User created',
            result: result
          })
        })
        .catch(err => {
          res.status(500).json({
            //  error: err

            //   error: {
            //     message: "Invalid authentication credentials"
            //   }

            //message was nested as error.error.error.message
            //remove last error nesting so it is just error.error
            message: "Invalid credentials"
          })
        })
    });
}


    exports.loginUser = (req, res, next) => {
      let fetchedUser;
      User.findOne({email: req.body.email})
        .then(user => {
          console.log(user);
          if(!user){
            return res.status(401).json({
              message: "Authorisation failed"
            });
          }
          fetchedUser = user;
          return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
          console.log(result);
          if(!result){
            return res.status(401).json({
              message: "Authorisation failed"
            });
          }
          //second param is secret used to generate the hash along with hashing the other two properties
          const token = jwt.sign(
            {email: fetchedUser.email, userId: fetchedUser._id},
            process.env.JWT_KEY,
            {expiresIn: "1h"}
          );
          res.status(200).json({
            token: token,
            expiresIn: 3600,
            userId: fetchedUser._id
          });
        })
        .catch(err => {
          return res.status(401).json({
            message: "Authorisation failed"
          });
        })
      }
