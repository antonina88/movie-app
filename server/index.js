const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const movieSchema = require("./schemas/movie");
const userSchema = require("./schemas/user");
const commentSchema = require("./schemas/comment");
const likeSchema = require("./schemas/like");

const cookieParser = require("cookie-parser");
const passport = require("passport");
const expressSession = require("express-session");

const Movie = mongoose.model("Movie", movieSchema);
const User = mongoose.model("User", userSchema);
const Comment = mongoose.model("Comment", commentSchema);
const Like = mongoose.model("Like", likeSchema);

mongoose.connect("mongodb://localhost/movies_app", {
  useMongoClient: true
});

mongoose.connection.on("open", () => {
  console.log("Connected!!!");
});

app.use(cors({credentials: true, origin: 'http://localhost:8080'}));
app.use(express.static(__dirname + '/app'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({ secret: "mySecretKey" }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.login);
});

passport.deserializeUser((login, done) => {
  User.findOne({ login }, (err, user) => {
   done(err, user);
  });
});

require("./login.js")(app, passport, User);
require("./signup.js")(app, User);

app.get("/*", (req, res, next) => {
  const { url, user } = req;
  if(!user && url !== "/login" && url !== "/users")
    return res.status(401).send({ error: "Unauthorized" });

  if(user && (url === "/login" || url === "/users"))
    return res.status(401).send({ error: "Unauthorized" });

  next();
});

//get authorized user
app.get('/user', (req, res) => {
  const username = req.user.login;
  res.send({username});
});

//get all users
app.get('/users', (req, res) => {
  User.find({}, (err, data) => {
      if(err)
        return res.status(500).send({
           error: "Can not get users"
        });
      res.send(data);
    });
});

require("./movies.js")(app, Movie, Like, Comment);
require("./likes.js")(app, Like);
require("./signout.js")(app, User);
require("./comments.js")(app, Comment);

//routing for entering point (index.html) with react-app
app
  .route('/')
  .get((req, res) => {
    res.sendFile(__dirname +'../app/index.html');
  })

app.listen(8000, () => {
  console.log('Server is up and running on port 8000');
});