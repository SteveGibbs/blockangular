const express = require("express");
const multer = require('multer');
const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid){
      error = null;
    }
    cb(error, "backend/images"); //path is relative to the server.js file
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
})
// in app.js the postsRoutes already is filtered for the url to include /api/posts

router.post(
  "",
  checkAuth,
  multer({storage: storage}).single("image"),
  (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });
  console.log(req.userData);
  post.save().then(createdPost => {
    console.log(createdPost);
    res.status(201).json({
      message: "Post added successfully",
      post: {
      id: createdPost._id,
      title: createdPost.title,
      content: createdPost.content,
      imagePath: createdPost.imagePath
      }
    });
  });
})

router.put("/:id", checkAuth, multer({storage: storage}).single("image"), (req, res, next) => {
  console.log(req.file);
  let imagePath = req.body.imagePath;
  if(req.file){
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }

  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath
  });
  Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post).then(result => {
    console.log("this is the result of the edit" + result);
    if(result.nModified > 0){
      res.status(200).json({message: "Update successful"});
    }
    else {
      res.status(401).json({message: "You are not authorized"});
    }
  })
})

router.get("", (req, res, next)=>{
  // const posts = [
  //   {
  //     id: "dfdfsdf12312312",
  //     title: "first server side post",
  //     content: "first content post"
  //   },
  //   {
  //     id: "dferewsdf12312312",
  //     title: "second server side post",
  //     content: "second content post"
  //   }
  // ];
  console.log(req.query);
  const pageSize = +req.query.pagesize; //as data comes from url query it is a string so use + to make it numeric
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage){
  postQuery
    .skip(pageSize* (currentPage -1))
    .limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Post.count();
      // res.status(200).json({
      //   message: 'Posts received successfully',
      //   posts: documents
      // });
    })
    .then(count => {
      res.status(200).json({
        message: 'Posts received successfully',
        posts: fetchedPosts,
        maxPosts: count
      });
    })
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if(post){
      res.status(200).json(post);
    } else {
      res.status(404).json({message: "Post not found!"});
    }
  })
})

router.delete("/:id", checkAuth, (req, res, next)=> {

  Post.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
    console.log(req.params.id);
    if(result.n > 0){
      res.status(200).json({message: "Post deleted"});
    }
    else {
      res.status(401).json({message: "You are not authorized"});
    }
  });

});

module.exports = router;
