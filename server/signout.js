module.exports = function(app, User) {
	app.get("/signout", (req, res) => {
	  req.logout();
	  
	  const username = req.user && req.user.login;
	  res.send({username});
	});
}