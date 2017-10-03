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

mongoose.connect("mongodb://localhost/movies_app", {
  useMongoClient: true
});
mongoose.connection.on("open", () => {
  console.log("Connected!!!");
});

app.use(cors({credentials: true, origin: 'http://localhost:8080'}));

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

passport.use(new LocalStrategy({
  usernameField: 'login',
  passwordField: 'password'
}, 
 function(login, password, done) {
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
  
  console.log("Request Login supossedly successful.");
  const username = req.user.login;
  res.send({username});
});

//-------------------------------------
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
 
  User.findOne({ login }, (err, user) => {
    if(err)
      return done(err);

    if(!user)

      User.create({ login, password, group: 'user'}, (err, user) => {

      if(err)
        return res.status(500).send({
          error: "Can not save User"
        });
     
      req.login(user, err => {
        if(err) return res.send(err);

        const username = req.user.login;
        return res.send({username});
      });

    });

    if(user)
      return res.status(500).send("user with such login already exists");
  })

});

app.get("/*", (req, res, next) => {
  const { url, user } = req;
  if(!user && url !== "/login" && url !== "/users")
    return res.status(401).send({ error: "Unauthorized" });

  if(user && (url === "/login" || url === "/users"))
    return res.status(401).send({ error: "Unauthorized" });

  next();
});

//-------------------------------------
app.get('/movies', (request, response) => {
  const MoviesReq = new Promise((resolve, reject) => {
      Movie.find({}, (error, data) => {
        if(error) return reject(error);

        const movies = data.map(mapLikesAndComments);
        
        Promise.all(movies)
          .then(movieRequest => {
            response.send(movieRequest);
          })
          .catch(err => {
            response.status(404).end();
        });

      });
    });

    const mapLikesAndComments = movie => new Promise((resolve, reject) =>{
        const movieId = movie._id;

        const likesReq = new Promise((resolve, reject) => {
            Like.find({ movieId }, (err, dataLikes) => {
                if(err) return reject(err);
                resolve(dataLikes);
            })
        });

        const commentsReq = new Promise((resolve, reject) => {
            Comment.find({ movieId }, (err, dataComments) => {
                if(err) return reject(err);
                resolve(dataComments);
            })
        });

        return Promise.all([likesReq, commentsReq])
            .then(([likesData, commentsData]) => {
              const countLikes = likesData.length;
              const countComments = commentsData.length;
              resolve(Object.assign({}, movie._doc, {comments: countComments}, {likes: countLikes}))
          })
      })
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
  const  movieId = req.params.id;
  
  const movieReq = new Promise((resolve, reject) => {
    Movie.findById(movieId, (err, movieData) => {
      if(err) return reject(err);

      const likesReq = new Promise((resolve, reject) => {
          Like.find({movieId}, (err, dataLikes) => {
            if(err) return reject(err);
            resolve(dataLikes);
          })
      })

      const commentsReq = new Promise((resolve, reject) => {
          Comment.find({movieId}, (err, dataComments) => {
            if(err) return reject(err);
            resolve(dataComments);
          })
      })

      Promise.all([likesReq, commentsReq])
        .then(([likesData, commentsData]) => {
          const countLikes = likesData.length;
          res.send(Object.assign({}, movieData._doc, {comments: commentsData}, {likes: countLikes}))
      })
        
    });
  });

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

app.get("/signout", (req, res) => {
  req.logout();

  const username = req.user && req.user.login;

  res.send({username});
});

app.get('/comments', (req, res) => {
  Comment.find({}, (err, data) => {
       if(err)
        return res.status(500).send({
          error: "Can not get comments"
        });
      res.send(data);
    });
});

app.post('/add-comment', (req, res) => {
  const description = req.body.description ? req.body.description.trim() : null;
  const movieId = req.body.movieId;

  if(!description) {
    return res.status(500).send("Please send valid information");
  }

  Comment.create({ 
    description, 
    movieId,
    username: req.user.login,
    date: new Date()
  }, (err, data) => {
      if(err)
        return res.status(500).send({
          error: "Can not save Comment"
        });

      res.status(200).send(data);
    });
});

app.get('/likes', (req, res) => {
  Like.find({}, (err, data) => {
       if(err)
        return res.status(500).send({
          error: "Can not get Likes"
        });
      res.send(data);
    });
});

app.get('/user', (req, res) => {
  const username = req.user.login;
  res.send({username});
});

app.post('/add-like', (req, res) => {
  const movieId = req.body.id;
  Like.create({ 
      movieId, 
      userId: req.user._id,
  }, (err, data) => {
      if(err)
        return res.status(500).send({
          error: "Can not save Like"
      });
     
      res.status(200).send(data);
    });
  }
)

app.post('/remove-like', (req, res) => {
  const movieId = req.body.id;
  const userId = req.user._id;

  Like.remove({ movieId, userId }, function(err, data) {
    if (err) 
      return res.status(500).send({
          error: "Can not remove Like"
      });
  });
})


app.listen(8000, () => {
  console.log('Server is up and running on port 8000');
});