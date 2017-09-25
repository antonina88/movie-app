import React from 'react';

export default function Registration({ handleLoginChange, handlePasswordChange, handleSignUp, selectAuthorizationForm }) {
	return (
		<form className="auth" action="/"><h2>Please sign up</h2>
			<label htmlFor="login">Login</label>
			<input type="text" id="login" onChange={handleLoginChange} />
			<br/>

			<label htmlFor="passwordField">Password</label>
			<input type="password" id="passwordField" onChange={handlePasswordChange} /> <br/>

			<div className="btn-container">
				<a className="SignIn" onClick={selectAuthorizationForm}> Sign in </a>
				<button className="SignUp active" onClick={handleSignUp}>Sign up</button>
			</div>
		</form>

	);
}
