const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, 'block_two_secret_adffeee122dfsef');
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    console.log('this is the userdata' + req.userData);
    next();
  } catch (error) {
    res.status(401).json({message: "Auth failed"});
  }

}
