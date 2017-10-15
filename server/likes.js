module.exports = function(app, Like) {
	app.get('/likes', (req, res) => {
	  Like.find({}, (err, data) => {
	       if(err)
	        return res.status(500).send({
	          error: "Can not get Likes"
	        });
	      res.send(data);
	    });
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
}