import React from 'react';
import { Link } from 'react-router-dom';

export default function TopMenu() {
	return (
		<ul className="main-menu">
			<li><Link to="/">All movies</Link></li>
			<li><Link to="/most-liked">Most liked</Link></li>
			<li><Link to="/most-commented">Most Commented</Link></li>
			<li><Link to="/new-comment">New comments</Link></li>
			<li><Link to="/add-movie">Add movie</Link></li>
		</ul>
	);
}
