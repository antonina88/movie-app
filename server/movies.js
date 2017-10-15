module.exports = function(app, Movie, Like, Comment) {
	const mongoose = require("mongoose");
	
	app
	.route('/movies')
	.get((request, response) => {
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
            Like.find({ movieId: mongoose.Types.ObjectId(movieId) }, (err, dataLikes) => {
               if(err) return reject(err);
               resolve(dataLikes);
	         })
	      });

	      const commentsReq = new Promise((resolve, reject) => {
	         Comment.find({ movieId: mongoose.Types.ObjectId(movieId) }, (err, dataComments) => {
	            if(err) return reject(err);
	            resolve(dataComments);
	         })
	      });

	      return Promise.all([likesReq, commentsReq])
	         .then(([likesData, commentsData]) => {
	            	movie.likes = likesData;
	            	movie.comments = commentsData;
	               resolve(movie);
	       	})
	  	}) 
	})

	app.post((req, res) => {
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

		//get movie by ID
		app.get('/movies/:id', (req, res) => {
		  const  movieId = req.params.id;
		  
		  const movieReq = new Promise((resolve, reject) => {
		    Movie.findById(movieId, (err, movie) => {
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
		          	movie.likes = likesData;
               		movie.comments = commentsData;
		          	res.status(200).send(movie)
		      	})
		    	});
		    
		  });

		})
		  //search movie by title
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
	
}
