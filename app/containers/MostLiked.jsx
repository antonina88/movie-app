import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMovies } from '../actions/movies';
import { Link } from 'react-router-dom';
import TopMenu from '../components/TopMenu.jsx';
import Header from '../components/Header.jsx';
import FooterBlock from '../components/FooterBlock.jsx';

class MostLiked extends Component {
	constructor(props) {
		super(props);
		this.sortElement = this.sortElement.bind(this);
	}
	sortElement(a, b) {
	    return b.likes - a.likes;
	}
	componentDidMount() {
		this.props.listMovies();	
	}
	render() {
	  	const { movies } = this.props;
	  	const sortMovies = [...movies].sort(this.sortElement);

	  	const sortMoviesList = sortMovies.map(movie => {
			 return (
		        <div className="movie-container" key={movie._id}>
		        	<img src={movie.url} /> <br/>
		        	<h3><Link to={`/movie/${movie._id}`}>
			        	{movie.title}
			        </Link></h3>
			        <p className="like-hand">
				        <svg enableBackground="new 0 0 24 24" height="24px" id="Layer_1" version="1.1" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M12,4.168C7.943-2.045,0,2.029,0,7.758c0,4.418,6.904,8.223,12,15.187c5.094-6.963,12-10.768,12-15.187  C24,2.029,16.307-2.045,12,4.168"/></svg>
						{movie.likes}
					</p>
		        </div>
		    );
		});

	    return (
	    	<div className="wrapper">
				<Header />
		    	<main>
		    		<div className="menu-container">
						<TopMenu />
					</div>
					<h1>Most liked movies</h1>
					<div className="list-movies">
						{sortMoviesList}
					</div>
				</main>
				<FooterBlock />
			</div>
	
	    );
	  }
}

const mapStateToProps = state => {
	return {
		movies: state.movies
	};
};
const mapDispatchToProps = dispatch => {
	return {
		listMovies: () => dispatch(getMovies()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MostLiked);
