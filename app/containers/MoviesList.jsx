import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import TopMenu from '../components/TopMenu.jsx';
import Search from '../components/Search.jsx';
import Header from '../components/Header.jsx';
import FooterBlock from '../components/FooterBlock.jsx';
import { getMovies, searchMovieByTitle } from '../actions/movies';

class MoviesList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: '',
			isSearch: false
		};
		this.handleFilterChange = this.handleFilterChange.bind(this);
		this.searchFilm = this.searchFilm.bind(this);
	}
	componentDidMount() {
		this.props.listMovies();	
	}
	handleFilterChange(ev) {
 		this.setState({ filter: ev.target.value.toLowerCase()});
	}
	searchFilm(ev) {
		ev.preventDefault();
		const { filter } = this.state;
		this.props.searchMovie(filter);
		this.setState({ isSearch: true });
	}

	render() {
		const { movies, searchingMovie, error } = this.props;
		const { isSearch } = this.state;

		const moviesList = movies.map(movie => {
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
		
		const moviesBlock = isSearch ? [
			<div className="list-movies">
				<div className="movie-container" key={searchingMovie._id}>
					<img src={searchingMovie.url} /> <br/>
						<h3>
							<Link to={`/movie/${searchingMovie._id}`}>
								{searchingMovie.title}
							</Link>
						</h3>
				</div>
			</div>
		] : <div className="list-movies">{moviesList}</div>;

		return (
			<div className="wrapper">
				<Header />
				<main>
					<div className="menu-container">
						<TopMenu />
						<Search
							handleFilterChange={this.handleFilterChange}
							searchFilm={this.searchFilm}
						/>
					</div>
					{moviesBlock}
				</main>
				<FooterBlock />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		movies: state.movies,
		searchingMovie: state.movieByTitle
	};
};
const mapDispatchToProps = dispatch => {
	return {
		listMovies: () => dispatch(getMovies()),
		searchMovie: (title) => dispatch(searchMovieByTitle(title))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
