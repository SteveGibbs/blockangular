const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    //The header information of the request is "Bearer dfdf439394" so split the info by whitespace and choose the second index to get the token from the header"
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, 'block_two_secret_adffeee122dfsef');
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    console.log('this is the userdata' + req.userData);
    next();
  } catch (error) {
    res.status(401).json({message: "You are not authenticated"});
  }

}
