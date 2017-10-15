module.exports = function(app, passport, User) {
	const LocalStrategy = require("passport-local").Strategy;
	
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

	app
		.route("/login")
	  .post(passport.authenticate('local'), (req, res) => {
	   
	  if(!req.user)
	    return res.send("Error");
	  
	  console.log("Request Login supossedly successful.");
	  
	  res.send(req.user);
	});
}