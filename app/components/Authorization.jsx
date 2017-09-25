import React from 'react';

export default function Authorization({ handleLoginChange, handlePasswordChange, handleLogIn, selectRegistrationForm }) {
	return (
		<form className="auth" action="/"><h2>Please sign in to the app</h2>
			<label htmlFor="login">Login</label>
			<input type="text" id="login" onChange={handleLoginChange} />
			<br/>

			<label htmlFor="passwordField">Password</label>
			<input type="password" id="passwordField" onChange={handlePasswordChange} /> <br/>

			<input type="checkbox" id="rememberPerson" />
			<label htmlFor="rememberPerson">Remember&nbsp;me </label> <br/>
			<div className="btn-container">
				<button className="SignIn active" onClick={handleLogIn}> Sign in </button>
				<a onClick={selectRegistrationForm}>Sign up</a>
			</div>
		</form>
	);
}
