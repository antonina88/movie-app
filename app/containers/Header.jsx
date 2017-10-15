import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'
import { connect } from 'react-redux';

import TopMenu from '../components/TopMenu.jsx';
import { fetchSignout, fetchAuthorizedUser } from '../actions/user';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menuIsOpen: false
		};
		this.toggleMenu = this.toggleMenu.bind(this);
		this.onSignout = this.onSignout.bind(this);
	}
	componentDidMount() {
		this.props.getUser();
	}

	toggleMenu(ev) {
		const menu = document.querySelector('p.userName');
		if (ev.target !== menu) {
			this.setState({ menuIsOpen: false });
		}
		if (ev.target === menu) {
			this.setState({ menuIsOpen: !this.state.menuIsOpen });
		}
	}

	onSignout(ev){
		ev.preventDefault();
		this.props.signout();
	}

	render() {
		const { menuIsOpen, isFetching, isRedirect } = this.state;
		const { username } = this.props;

		const dropDownMenu = menuIsOpen ? [
			<ul className="profile">
				<li><Link to="/profile"> Profile info </Link></li>
				<li><Link to="/" onClick={this.onSignout}> Sign out </Link></li>
			</ul>
			] : null;
		return (
			<header className="movies" onClick={this.toggleMenu}>
				
				<div className="movie-logo">
					<Link to="/"><img src="../app/img/logo.png" width="175" height="96" alt="logotype" title="logotype"/></Link>
					<h1>Moooviez</h1>
				</div>
				<div className="user">
					<p className="userName" onClick={this.toggleMenu}>{username}</p>
					<img className="avatar" src="../app/img/avatar.png" width="40" height="40"/>
					{dropDownMenu}
				</div>
			</header>
		);
	}
}

const mapStateToProps = state => {
	return {
		username: state.user.username
	};
};
const mapDispatchToProps = dispatch => ({
	signout() {
	  dispatch(fetchSignout());
	},
	getUser() {
	  dispatch(fetchAuthorizedUser());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
