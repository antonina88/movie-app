module.exports = function(app, Comment) {
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
	    userId: req.user._id,
	    date: new Date()
	  }, (err, data) => {
	      if(err)
	        return res.status(500).send({
	          error: "Can not save Comment"
	        });

	      res.status(200).send(data);
	    });
	});
}