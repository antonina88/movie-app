import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Header from './Header.jsx';
import FooterBlock from '../components/FooterBlock.jsx';
import TopMenu from '../components/TopMenu.jsx';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { fetchAddMovie } from '../actions/movies';

class AddMovie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			url: '',
			open: false
		};
		this.updateUrl = this.updateUrl.bind(this);
		this.updateTitle = this.updateTitle.bind(this);
		this.updateContent = this.updateContent.bind(this);
		this.updateContent = this.updateContent.bind(this);
		this.createMovie = this.createMovie.bind(this);
		this.clearForm = this.clearForm.bind(this);
	}
	updateUrl(event) {
		this.setState({url: event.target.value});
		const previewBlock = document.querySelector('.cover-preview');
		previewBlock.style = `background: url(${event.target.value}) top center/250px auto no-repeat`;
	}
	updateTitle(event) {
		this.setState({title: event.target.value});
	}
	updateContent(event) {
		this.setState({description: event.target.value});
	}
	clearForm() {
		this.setState({
			url: '',
			title: '',
			description: ''
		});
		const previewBlock = document.querySelector('.cover-preview');
		previewBlock.style = `background: none`;
	}

	createMovie(event) {
		event.preventDefault();
		const { title, description, url } = this.state;

		this.props.addMovie(title, description, url);
		this.clearForm();
		this.setState({open: true});
	}
	handleClose = () => {
	    this.setState({open: false});
	};

	render() {
		const {url, title, description, open} = this.state;

		const actions = [
		<FlatButton
	        label="Закрыть"
	        primary={true}
	        onClick={this.handleClose}
	      />
	    ];

	    const alert = open? [
	    	<Dialog
			    actions={actions}
			    modal={false}
			    open={this.state.open}
			>
			Данные сохранены
			</Dialog>
	    ]: null

		return (
			<div className="wrapper">
				<Header />
				<div className="menu-container">
					<TopMenu />
				</div>
				<div className="add-movie">
					<div className="cover-preview">&nbsp;</div>
					{alert}
					<form>
						<input type="text" placeholder="Movie title" value={title} onChange={this.updateTitle} />
						<textarea placeholder="Movie description" value={description} onChange={this.updateContent}></textarea>
						<input type="text" placeholder="Cover url" value={url} onChange={this.updateUrl} />
						<button className="publish-movie" onClick={this.createMovie} >
							<svg enableBackground="new 0 0 30 30" height="15px" id="Capa_1" version="1.1" viewBox="0 0 30 30" width="15px" xmlns="http://www.w3.org/2000/svg">
								<path d="M24.7,27.2c0.5,0,0.8-0.4,0.8-0.8s-0.4-0.8-0.8-0.8c-0.4,0-0.8,0.4-0.8,0.8S24.3,27.2,24.7,27.2z M28.1,0.1  H1.9c-1,0-1.8,0.8-1.8,1.8v26.1c0,1,0.8,1.8,1.8,1.8h26.1c1,0,1.8-0.8,1.8-1.8V1.9C29.9,0.9,29.1,0.1,28.1,0.1z M28.4,28.1  c0,0.2-0.1,0.3-0.3,0.3H1.9c-0.2,0-0.3-0.1-0.3-0.3v-3.7h26.8V28.1z M28.4,22.8H1.6V6.7h26.8V22.8z M28.4,5.2H1.6V1.9  c0-0.2,0.1-0.3,0.3-0.3h26.1c0.2,0,0.3,0.1,0.3,0.3V5.2z M10,27.2c0.4,0,0.8-0.4,0.8-0.8s-0.4-0.8-0.8-0.8s-0.8,0.4-0.8,0.8  S9.6,27.2,10,27.2z M19.8,2.6c-0.5,0-0.8,0.4-0.8,0.8s0.4,0.8,0.8,0.8c0.4,0,0.8-0.4,0.8-0.8S20.3,2.6,19.8,2.6z M19.8,27.2  c0.4,0,0.8-0.4,0.8-0.8s-0.4-0.8-0.8-0.8c-0.5,0-0.8,0.4-0.8,0.8S19.4,27.2,19.8,27.2z M14.9,27.2c0.5,0,0.8-0.4,0.8-0.8  s-0.4-0.8-0.8-0.8c-0.4,0-0.8,0.4-0.8,0.8S14.5,27.2,14.9,27.2z M5.1,27.2c0.5,0,0.8-0.4,0.8-0.8s-0.4-0.8-0.8-0.8  c-0.4,0-0.8,0.4-0.8,0.8S4.7,27.2,5.1,27.2z M14.9,2.6c-0.4,0-0.8,0.4-0.8,0.8s0.4,0.8,0.8,0.8c0.5,0,0.8-0.4,0.8-0.8  S15.4,2.6,14.9,2.6z M10,2.6c-0.4,0-0.8,0.4-0.8,0.8S9.6,4.2,10,4.2s0.8-0.4,0.8-0.8S10.5,2.6,10,2.6z M12,20.3  c0.1,0.1,0.2,0.1,0.3,0.1c0.2,0,0.3-0.1,0.5-0.2l6.4-5.1c0.2-0.1,0.3-0.4,0.3-0.6s-0.1-0.4-0.3-0.6l-6.4-5.1  c-0.2-0.2-0.5-0.2-0.8-0.1c-0.3,0.1-0.4,0.4-0.4,0.7v10.2C11.6,19.9,11.7,20.2,12,20.3z M13.1,11l4.5,3.5l-4.5,3.5V11z M24.7,2.6  c-0.4,0-0.8,0.4-0.8,0.8s0.4,0.8,0.8,0.8c0.5,0,0.8-0.4,0.8-0.8S25.2,2.6,24.7,2.6z M5.1,2.6c-0.4,0-0.8,0.4-0.8,0.8  s0.4,0.8,0.8,0.8c0.5,0,0.8-0.4,0.8-0.8S5.6,2.6,5.1,2.6z"/>
							</svg>
							Publish movie
						</button>
					</form>
				</div>
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
const mapDispatchToProps = dispatch => ({
	addMovie: (title, description, url) =>  dispatch(fetchAddMovie(title, description, url))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMovie);
