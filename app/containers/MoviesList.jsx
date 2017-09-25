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
		this.getAllFilms = this.getAllFilms.bind(this);
	}
	componentDidMount() {
		this.props.listMovies();	
	}
	getAllFilms(ev) {
		ev.preventDefault();
		this.setState({ isSearch: false });
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

		if (error === "Unauthorized") {
			return  <Redirect to="/login" />
		}

		const moviesList = movies.map(movie => {
			 return (
		        <div className="movie-container" key={movie._id}>
		        	<img src={movie.url} /> <br/>
		        	<h3><Link to={`/movie/${movie._id}`}>
			        	{movie.title}
			        </Link></h3>
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
						<TopMenu getAllFilms={this.getAllFilms} />
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
		error: state.failure.error,
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
