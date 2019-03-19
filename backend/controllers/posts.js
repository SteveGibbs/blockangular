const Post = require('../models/post');


exports.createPost = (req, res, next) => {
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

  })
    .catch( error => {
      res.status(500).json({
        message: "Creating a post failed"
      });
    });
}

exports.updatePost = (req, res, next) => {
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
    imagePath: imagePath,
    creator: req.userData.userId
  });
  //only the user that created the post can edit their own post it checks req.userData.userId
  Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post).then(result => {
    console.log("this is the result of the edit" + result);
    if(result.nModified > 0){
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

exports.getPosts = (req, res, next)=>{
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
    .catch( error => {
      res.status(500).json({
        message: 'Could not get posts'
      })
    })
}

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if(post){
      res.status(200).json(post);
    } else {
      res.status(404).json({message: "Post not found!"});
    }
  })
    .catch( error => {
      res.status(500).json({
        message: 'Could not get post'
      })
    })
}

exports.deletePost = (req, res, next)=> {

  Post.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
    console.log(req.params.id);
    if(result.n > 0){
      res.status(200).json({message: "Post deleted"});
    }
    else {
      res.status(401).json({message: "You are not authorized"});
    }
  })
    .catch( error => {
      res.status(500).json({
        message: 'Could not delete post'
      })
    })

}
