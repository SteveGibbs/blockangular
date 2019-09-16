const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

mongoose.connect( process.env.MONGO_ATLAS || "mongodb://localhost:27017/blockang", { useNewUrlParser: true });
mongoose.connection.on('error', console.error.bind(console, "Mongo error:"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

//it will only use postsRoutes when the url /api/posts is used so because it already filters for this criteria you can remove /api/posts
//in the posts.js file.
app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
