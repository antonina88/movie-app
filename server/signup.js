module.exports = function(app, User) {
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
}