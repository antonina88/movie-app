import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header.jsx';
import FooterBlock from '../components/FooterBlock.jsx';
import AddComment from '../components/AddComment.jsx';
import CommentsList from '../components/CommentsList.jsx';
import MostLiked from './MostLiked.jsx';
import UpdateLike from '../components/UpdateLike.jsx';
import TopMenu from '../components/TopMenu.jsx';

import { fetchMovieById } from '../actions/movies';
import { fetchAddComment } from '../actions/comment';
import { fetchLike, fetchRemoveLike } from '../actions/likes';

class MoviePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			description: '',
			changeMovie: '',
			toggleLike: false
		}
		this.handleChangeComment = this.handleChangeComment.bind(this);
		this.addComment = this.addComment.bind(this);
		this.cleareForm = this.cleareForm.bind(this);
		this.handleChangeLike = this.handleChangeLike.bind(this);
	}

	componentDidMount() {
		this.props.getMovie(); 
	}

	handleChangeComment (ev) {
		this.setState({ description: ev.target.value });
	}

	cleareForm (ev) {
		this.setState({ description: '' });
	}

	addComment(ev) {
		ev.preventDefault();
		const { description } = this.state;
		const movieId = this.props.movie._id;
		this.props.createComment(description, movieId);
		this.cleareForm();
	}

	handleChangeLike(ev) {
		ev.preventDefault();
		const { toggleLike } = this.state;
		if (!toggleLike) {
			ev.target.classList.add("active");
			this.props.addLikes();
		}
		if (toggleLike) {
			ev.target.classList.remove("active");
			this.props.removeLike();
		}
		
		this.setState({ toggleLike: !toggleLike });
	}	

	render() {
		const {	movie } = this.props;
		const comments = movie.comments;
		const movieDate = movie.date&&movie.date.split("T")[0];

		if (comments) {
			var commentList = comments.map(comment => {
				const date = comment.date.split("T")[0];
				return (
					<div className="comments-list" key={comment._id}>
						<p className="date">{comment.username}</p>
						<p className="date">{date}</p>
						<p className="textComment">{comment.description}</p>
					</div>
				)
			})
			var commentsCount = comments.length;
		}

		return (
			<div className="wrapper">
				<Header />
				<main className="movie-page">
					<div className="menu-container">
						<TopMenu />
					</div>
					<h1 className="title">{movie.title}</h1>
					<div className="movie-page">
						<img src={movie.url} />
						<div className="content-movie">
							<p className="text">{movie.description}</p>
							<p className="date">
								<svg enableBackground="new 0 0 32 32" height="24px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="24px" xmlns="http://www.w3.org/2000/svg"><g fill="#cccccc"id="calendar_1_"><path d="M29.334,3H25V1c0-0.553-0.447-1-1-1s-1,0.447-1,1v2h-6V1c0-0.553-0.448-1-1-1s-1,0.447-1,1v2H9V1 c0-0.553-0.448-1-1-1S7,0.447,7,1v2H2.667C1.194,3,0,4.193,0,5.666v23.667C0,30.806,1.194,32,2.667,32h26.667 C30.807,32,32,30.806,32,29.333V5.666C32,4.193,30.807,3,29.334,3z M30,29.333C30,29.701,29.701,30,29.334,30H2.667 C2.299,30,2,29.701,2,29.333V5.666C2,5.299,2.299,5,2.667,5H7v2c0,0.553,0.448,1,1,1s1-0.447,1-1V5h6v2c0,0.553,0.448,1,1,1 s1-0.447,1-1V5h6v2c0,0.553,0.447,1,1,1s1-0.447,1-1V5h4.334C29.701,5,30,5.299,30,5.666V29.333z" fill="#333332"/><rect fill="#333332" height="3" width="4" x="7" y="12"/><rect fill="#333332" height="3" width="4" x="7" y="17"/><rect fill="#333332" height="3" width="4" x="7" y="22"/><rect fill="#333332" height="3" width="4" x="14" y="22"/><rect fill="#333332" height="3" width="4" x="14" y="17"/><rect fill="#333332" height="3" width="4" x="14" y="12"/><rect fill="#333332" height="3" width="4" x="21" y="22"/><rect fill="#333332" height="3" width="4" x="21" y="17"/><rect fill="#333332" height="3" width="4" x="21" y="12"/></g></svg>
								{movieDate}
							</p> 
							<div className="details">
								<UpdateLike 
									handleChangeLike = {this.handleChangeLike} 
									likes = {movie.likes}
								/>
								<p className="comment-count">
									<svg enableBackground="new 0 0 32 32" height="24px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="24px" xmlns="http://www.w3.org/2000/svg"><g id="bubble"><path d="M16,7c-5.963,0-11,3.206-11,7c0,0.276,0.224,0.5,0.5,0.5   S6,14.276,6,14c0-3.196,4.673-6,10-6c0.275,0,0.5-0.224,0.5-0.5S16.276,7,16,7z" fill="#333333" /><path d="M16,2C7.163,2,0,7.373,0,14c0,4.127,2.779,7.766,7.008,9.926   C7.008,23.953,7,23.971,7,24c0,1.793-1.339,3.723-1.928,4.736c0.001,0,0.002,0,0.002,0C5.027,28.846,5,28.967,5,29.094   C5,29.594,5.405,30,5.906,30C6,30,6.165,29.975,6.161,29.986c3.125-0.512,6.069-3.383,6.753-4.215C13.913,25.918,14.943,26,16,26   c8.835,0,16-5.373,16-12C32,7.373,24.836,2,16,2z M16,24c-0.917,0-1.858-0.07-2.796-0.207c-0.097-0.016-0.194-0.021-0.29-0.021   c-0.594,0-1.163,0.264-1.546,0.73c-0.428,0.521-1.646,1.684-3.085,2.539c0.39-0.895,0.695-1.898,0.716-2.932   c0.006-0.064,0.009-0.129,0.009-0.184c0-0.752-0.421-1.439-1.09-1.781C4.212,20.252,2,17.207,2,14C2,8.486,8.28,4,16,4   c7.718,0,14,4.486,14,10C30,19.514,23.719,24,16,24z" fill="#333333" /></g></svg>
									{commentsCount}
								</p>
							</div>
						</div>
					</div>

					<div className="comment-container">
						<AddComment 
							handleChangeComment = {this.handleChangeComment}
							description = {this.state.description}
							addComment = {this.addComment}
						/>
						<CommentsList 
							commentList = {commentList}
						/>
					</div>
				</main>
				<FooterBlock />
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		movie: state.getMovieById
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const movieId = ownProps.match.params.id;
	return {
		getMovie: () => dispatch(fetchMovieById(movieId)),
		createComment: (textComment, id) => dispatch(fetchAddComment(textComment, id)),
		addLikes: () => dispatch(fetchLike(movieId)),
		removeLike: () => dispatch(fetchRemoveLike(movieId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
