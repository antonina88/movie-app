import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMovies } from '../actions/movies';
import { Link } from 'react-router-dom';
import TopMenu from '../components/TopMenu.jsx';
import Header from './Header.jsx';
import FooterBlock from '../components/FooterBlock.jsx';

class MostLiked extends Component {
	constructor(props) {
		super(props);
		this.sortElement = this.sortElement.bind(this);
	}
	sortElement(a, b) {
	    return b.likes.length - a.likes.length;
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
		        	<img width="220" src={movie.url} /> <br/>
		        	<h3><Link to={`/movie/${movie._id}`}>
			        	{movie.title}
			        </Link></h3>
			    
					<div className="details">
				        <p className="like-count">
					        <svg enableBackground="new 0 0 128 128" height="24px" id="Layer_1" version="1.1" viewBox="0 0 128 128" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M90.8,15C70.7,15,64,31,64,31s-6.7-16-26.8-16S6,31,6,49.3c0,34.3,58,64,58,64s58-29.7,58-64  C122.1,31,110.9,15,90.8,15z M90.6,91c-11.1,8.9-22.2,15.4-26.5,17.7c-4.3-2.4-15.5-8.8-26.6-17.8C24.9,80.8,10,65.4,10,49.3  c0-8.3,2.5-15.9,7.1-21.4C22,22.1,29,19,37.3,19c17.2,0,23,13.4,23.1,13.5l3.7,8.8l3.7-8.8C68,32,73.8,19,90.8,19  c8.3,0,15.2,3.1,20.1,8.9c4.6,5.5,7.1,13.1,7.1,21.4C118.1,65.4,103.1,80.9,90.6,91z" fill="#0d5f69"/></svg>
					        {movie.likes.length}
					    </p>
						<p className="comment-count">
							<svg enableBackground="new 0 0 32 32" height="23px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="23px" xmlns="http://www.w3.org/2000/svg"><g id="bubble"><path d="M16,7c-5.963,0-11,3.206-11,7c0,0.276,0.224,0.5,0.5,0.5   S6,14.276,6,14c0-3.196,4.673-6,10-6c0.275,0,0.5-0.224,0.5-0.5S16.276,7,16,7z" fill="#2850db" /><path d="M16,2C7.163,2,0,7.373,0,14c0,4.127,2.779,7.766,7.008,9.926   C7.008,23.953,7,23.971,7,24c0,1.793-1.339,3.723-1.928,4.736c0.001,0,0.002,0,0.002,0C5.027,28.846,5,28.967,5,29.094   C5,29.594,5.405,30,5.906,30C6,30,6.165,29.975,6.161,29.986c3.125-0.512,6.069-3.383,6.753-4.215C13.913,25.918,14.943,26,16,26   c8.835,0,16-5.373,16-12C32,7.373,24.836,2,16,2z M16,24c-0.917,0-1.858-0.07-2.796-0.207c-0.097-0.016-0.194-0.021-0.29-0.021   c-0.594,0-1.163,0.264-1.546,0.73c-0.428,0.521-1.646,1.684-3.085,2.539c0.39-0.895,0.695-1.898,0.716-2.932   c0.006-0.064,0.009-0.129,0.009-0.184c0-0.752-0.421-1.439-1.09-1.781C4.212,20.252,2,17.207,2,14C2,8.486,8.28,4,16,4   c7.718,0,14,4.486,14,10C30,19.514,23.719,24,16,24z" fill="#2c8886" /></g></svg>
							{movie.comments.length}
						</p>
						<p className="date">
						<svg enableBackground="new 0 0 32 32" height="24px" id="Слой_1" version="1.1" viewBox="0 0 32 32" width="24px" xmlns="http://www.w3.org/2000/svg" ><path d="M31.705,15.284L31.705,15.284L31.705,15.284  l-9.97-9.991c-0.634-0.66-1.748-0.162-1.723,0.734v4.976C20.008,11.002,20.004,11,20,11H1c-0.55,0-1,0.45-1,1v8c0,0.55,0.45,1,1,1  h19c0.004,0,0.008-0.002,0.012-0.002v4.972c-0.024,0.892,1.082,1.376,1.715,0.742l9.977-9.999  C32.098,16.318,32.098,15.678,31.705,15.284z M22.017,23.564V19H22h-1h-0.988v0.002C20.008,19.002,20.004,19,20,19h-1H2v-6h17h1  c0.004,0,0.008-0.002,0.012-0.002V13H21h1h0.017V8.432l7.55,7.566L22.017,23.564z" fill="#2c8886" id="Arrow_Right"/><g/><g/><g/><g/><g/><g/></svg>
						{movie.date}
						</p>
					</div>


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
