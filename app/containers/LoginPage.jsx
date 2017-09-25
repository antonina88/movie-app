import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import Authorization from '../components/Authorization.jsx';
import Registration from '../components/Registration.jsx';
import { fetchNewUser, fetchAuth } from '../actions/user';

class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: '',
       		password: '',
       		formtype: 'authorization'
		};
		this.handleLoginChange = this.handleLoginChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleLogIn = this.handleLogIn.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
		this.selectAuthorizationForm = this.selectAuthorizationForm.bind(this);
		this.selectRegistrationForm = this.selectRegistrationForm.bind(this);
	}

	handleLoginChange(ev) {
        this.setState({ login: ev.target.value });
    }

    handlePasswordChange(ev) {
    	this.setState({ password: ev.target.value });
    }

    handleLogIn(ev) {
    	ev.preventDefault();
    	const { login, password } = this.state;
    	this.props.authenticate(login, password);
    }

    handleSignUp(ev) {
    	ev.preventDefault();
    	const { login, password } = this.state;
    	this.props.addUser(login, password);
    }

    selectAuthorizationForm(ev) {
    	ev.preventDefault();
    	this.setState({formtype: 'authorization'});
    }

    selectRegistrationForm(ev) {
   		ev.preventDefault();
   		this.setState({formtype: 'registration'});
   	}

	render() {
		const { formtype } = this.state;
		let form;

		switch (formtype) {
			case 'authorization': {
				form = [<Authorization key="signin"
							handleLoginChange = {this.handleLoginChange}
							handlePasswordChange = {this.handlePasswordChange}
							handleLogIn = {this.handleLogIn}
							selectRegistrationForm = {this.selectRegistrationForm}
							/>];
				break;
			}
			case 'registration': {
					form = [<Registration key="signup"
								handleLoginChange = {this.handleLoginChange}
								handlePasswordChange = {this.handlePasswordChange}
								handleSignUp = {this.handleSignUp}
								selectAuthorizationForm = {this.selectAuthorizationForm}
								/>];
						break;
			}
			default: {
					form = null;
			}
		}
		return (
			<div className="app-container">
				<div className="border-left"></div>
					<div className="wrapper">
						<header>
							<h1>Welcome to the moooviez</h1>
							<h2>Your rate matters</h2>
							<div className="logo">
								<Link to="/">
									<img src="app/img/logo.png" width="195" height="106" alt="moviez site" title="moviez site" />
								</Link>
							</div>
						</header>
						<main className="loginPage"> {form} </main>
					</div>
				<div className="border-right"></div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: (login, password) => dispatch(fetchNewUser(login, password)),
    authenticate: (login, password) => dispatch(fetchAuth(login, password))
  };
};

export default connect(null, mapDispatchToProps)(LoginPage);
