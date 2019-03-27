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

     exports.updateUser = (req, res, next) => {

     }


exports.getUsers = (req, res, next)=>{
  console.log(req.query);
  const pageSize = +req.query.pagesize; //as data comes from url query it is a string so use + to make it numeric
  const currentPage = +req.query.page;
  const userQuery = User.find();
  let fetchedUsers;
  if (pageSize && currentPage){
    userQuery
      .skip(pageSize* (currentPage -1))
      .limit(pageSize);
  }
  userQuery
    .then(documents => {
      fetchedUsers = documents;
      return User.count();
    })
    .then(count => {
      res.status(200).json({
        message: 'Users found successfully',
        users: fetchedUsers,
        maxUsers: count
      });
    })
    .catch( error => {
      res.status(500).json({
        message: 'Could not get users'
      })
    })
}

exports.getUser = (req, res, next) => {
  User.findById(req.params.id).then(user => {
    if(user){
      res.status(200).json(user);
    } else {
      res.status(404).json({message: "User not found!"});
    }
  })
    .catch( error => {
      res.status(500).json({
        message: 'Could not get user'
      })
    })
}

exports.deleteUser = (req, res, next)=> {

  User.deleteOne({_id: req.params.id}).then(result => {
    console.log(req.params.id);
    console.log("deleting the user" + req.params.id);
    if(result.n > 0){
      res.status(200).json({message: "User deleted"});
    }
    else {
      res.status(401).json({message: "You are not authorized"});
    }
  })
    .catch( error => {
      res.status(500).json({
        message: 'Could not delete user'
      })
    })

}

exports.updateUser = (req, res, next) => {
  // console.log(req.file);
  // let imagePath = req.body.imagePath;
  // if(req.file){
  //   const url = req.protocol + '://' + req.get("host");
  //   imagePath = url + "/images/" + req.file.filename
  // }

  const user = new User({
    _id: req.body.id,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    address_line1: req.body.address_line1,
    address_line2: req.body.address_line2,
    postcode: req.body.postcode,
    suburb: req.body.suburb,
    address_state: req.body.address_state
    // content: req.body.content,
    // imagePath: imagePath,
    // creator: req.userData.userId
  });
  //only the user that created the post can edit their own post it checks req.userData.userId
  console.log(user);
  User.updateOne({_id: req.params.id}, user)
    .then(result => {
      console.log(result);
      if(result.n > 0){
        res.status(200).json({message: "Update successful"});
      }
      else {
        res.status(401).json({message: "You are not authorized"});
      }
    })
    //catch technical errors
    .catch (error => {
      res.status(500).json({
        message: "Update failed"
      });
    });
}

// router.post('/profile-details', function(req, res, next){
//   var uniqueid = req.params.id;
//   var result = {};
//
//   var item = {
//     email: req.body.email,
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     rank: req.body.rank,
//     membership_number: req.body.membership_number,
//     imagePath: req.body.imagePath,
//     description: req.body.description,
//     home_address_line1: req.body.home_address_line1,
//     home_address_line2: req.body.home_address_line2,
//     postal_code: req.body.postal_code,
//     address_state: req.body.address_state,
//     address_country: req.body.address_country,
//     site: req.body.site
//
//   };
//
//   var id = req.body.id;
//
//   var editObject = function() {
//     //assert.equal(null, err);
//     //pass the id into the objectId function to transform it into an objectId that Mongo recognises as the
//     // first parameter then use $set to say what the new data should be
//     //$set just updates only the selected fields;
//     User.updateOne({'_id': objectId(id)}, {$set: item}, function (err, result) {
//       //  assert.equal(null, err);
//       console.log(item);
//       res.redirect('/user/profile');
//
//     });
//   }
//   editObject();
//
// });
