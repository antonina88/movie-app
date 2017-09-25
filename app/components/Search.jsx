import React from 'react';

export default function Search({handleFilterChange, searchFilm}) {
	return (
		<form className="search">
			<input type="text" placeholder="Search a movie" onChange={handleFilterChange} />
			<button onClick={searchFilm}>Search</button>
		</form>
	);
}
