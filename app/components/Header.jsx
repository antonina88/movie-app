import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menuIsOpen: false
		};
		this.toggleMenu = this.toggleMenu.bind(this);
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

	render() {
		const { menuIsOpen } = this.state;
		const dropDownMenu = menuIsOpen ? [
			<ul className="profile">
				<li><Link to="/profile"> Profile info </Link></li>
				<li><Link to="/" > Sign out </Link></li>
			</ul>
			] : null;
		return (
			<header className="movies" onClick={this.toggleMenu}>
				<div className="movie-logo">
					<Link to="/"><img src="app/img/logo.png" width="175" height="96" alt="logotype" title="logotype"/></Link>
					<h1>Moooviez</h1>
				</div>
				<div className="user">
					<p className="userName" onClick={this.toggleMenu}>User</p>
					<img className="avatar" src="app/img/avatar.png" width="40" height="40"/>
					{dropDownMenu}
				</div>
			</header>
		);
	}
}

