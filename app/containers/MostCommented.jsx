import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getMovies } from '../actions/movies';
import { Link } from 'react-router-dom';
import TopMenu from '../components/TopMenu.jsx';
import Header from '../components/Header.jsx';
import FooterBlock from '../components/FooterBlock.jsx';

export default class MostCommented extends Component {
	
	render() {
	    return (
	    	<div className="wrapper">
				<Header />
				<div className="menu-container">
					<TopMenu />
				</div>
				<h1>Most commented movies</h1>
				<FooterBlock />
			</div>
	
	    );
	  }
}
