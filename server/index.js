const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  cors = require("cors"),

  movieSchema = require("./schemas/movie"),
  userSchema = require("./schemas/user"),
  commentSchema = require("./schemas/comment"),
  likeSchema = require("./schemas/like"),

  cookieParser = require("cookie-parser"),
  passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  expressSession = require("express-session");

const Movie = mongoose.model("Movie", movieSchema);
const User = mongoose.model("User", userSchema);
const Comment = mongoose.model("Comment", commentSchema);
const Like = mongoose.model("Like", likeSchema);

let authUser = null;

mongoose.connect("mongodb://localhost/movies_app", {
  useMongoClient: true
});
mongoose.connection.on("open", () => {
  console.log("Connected!!!");

  Movie.findByIdAndRemove("59c8d72697830512e09cadbd", (err, data) => {
    if(err) {
      console.log("ERROR >>>", err);
      return;
    }

    console.log(data);
  });
  
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(expressSession({ secret: "mySecretKey" }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.login);
});

passport.deserializeUser((login, done) => {
  User.findOne({ login }, done);
});

passport.use(new LocalStrategy({
  usernameField: 'login',
  passwordField: 'password'
}, (login, password, done) => {
  User.findOne({ login }, (err, user) => {
    if(err)
      return done(err);

    if(!user)
      return done(null, false, { message: "User was not found" });

    if(user.password !== password)
      return done(null, false, { message: "Incorrect password" });

    return done(null, user);
  })
}));

app.route("/login")
  .post(passport.authenticate('local'), (req, res) => {
   
  if(!req.user)
    return res.send("Error");

  authUser = req.user;
  res.send(req.user);
});

app.get("/*", (req, res, next) => {
  const { url, user } = req;

  if(!authUser && url !== "/login" && url !== "/users")
    return res.status(401).send({ error: "Unauthorized" });

  if(authUser && (url === "/login" || url === "/users"))
    return res.status(401).send({ error: "Unauthorized" });
  
  next();
});

app.get('/users', (req, res) => {
  User.find({}, (err, data) => {
      if(err)
        return res.status(500).send({
           error: "Can not get users"
        });
      res.send(data);
    });
});

app.post('/users', (req, res) => {
  const login = req.body.login ? req.body.login.trim() : null;
  const password = req.body.password ? req.body.password.trim() : null;

  if(!login || !password) {
    return res.status(500).send("Please send valid information");
  }
 
  User.create({ login, password, group: 'user'}, (err, user) => {
      if(err)
        return res.status(500).send({
          error: "Can not save User"
        });
     
      req.login(user, err => {
        if(err) return res.send(err);

        res.send(user);
      });

    });
});

app.get('/comments', (req, res) => {
  Comment.find({}, (err, data) => {
       if(err)
        return res.status(500).send({
          error: "Can not get users"
        });
      res.send(data);
    });
});

app.post('/comments', (req, res) => {
  const description = req.body.description ? req.body.description.trim() : null;
  const movieId = req.body.movieId;

  if(!description) {
    return res.status(500).send("Please send valid information");
  }
  
  Comment.create({ 
    description, 
    movieId,
    username: authUser.login,
    date: new Date()
  }, (err, data) => {
      if(err)
        return res.status(500).send({
          error: "Can not save Comment"
        });

      res.status(200).send(data);
    });
});

app.get('/movies', (req, res) => {
	Movie.find({}, (err, data) => {
       if(err)
        return res.status(500).send({
          error: "Can not get movies"
        });
      res.status(200).send(data);
    });
});

app.post('/movies', (req, res) => {
  const title = req.body.title ? req.body.title.toLowerCase().trim() : null;
  const description = req.body.description ? req.body.description.trim() : null;
  const url = req.body.url ? req.body.url.trim() : null;
    
  Movie.create({
    title,
    description,
    url,
    date: new Date()
  }, (err, data) => {
      if(err)
        return res.status(500).send({
          error: "Can not save Movie"
        });

      res.status(200).send(data);
    });
});

app.get('/movies/:id', (req, res) => {
  Movie.findById(req.params.id).then(data => {
    res.send(data);
  })
})

app.post('/filter-movie', (req, res) => {
 const { title } = req.body;
  Movie.findOne({ title }, (err, data) => {
    if (err) {
      return res.status(500).send({
          error: "Can not get Movie at this title"
        });
    }
    if (data) return res.send(data);
  });
})

app.post('/select-comments', (req, res) => {
  const movieId = req.body.id;
 
  Comment.find({ movieId }, (err, data) => {
    if (err) {
      return res.status(500).send({
          error: "Can not get Movie at this title"
      });
    }
    if (data) {
      Movie.findByIdAndUpdate(movieId, { $inc: { comments: 1 }},  function (err, raw) {
        if (err) 
          return handleError(err);
      });
      return res.send(data);
    } 
  });
})

app.post('/add-like', (req, res) => {
  const movieId = req.body.id;
  
  Like.create({ 
      movieId, 
      count: 1,
      username: authUser.login,
  }, (err, data) => {
      if(err)
        return res.status(500).send({
          error: "Can not save Like"
      });
     
      res.status(200).send(data);
    });
     
    Movie.findByIdAndUpdate(movieId, { $inc: { likes: 1 }},  function (err, raw) {
      if (err) 
        return handleError(err);
    });
  }
)

app.listen(8000, () => {
	console.log('Server is up and running on port 8000');
});