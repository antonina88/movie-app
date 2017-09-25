const api = 'http://localhost:8000';

export function listMovies() {
    return fetch(`${api}/movies`).then(res => {
        if (res.status === 200) {
            return res.json();
        }
        throw new Error(res.statusText);
    });
}

export function createMovie(title, description, url) {
    return fetch(`${api}/movies`, {
    	method: 'POST',
    	headers: {
    		'content-type': 'application/json'
    	},
    	body: JSON.stringify({ title, description, url })
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        }
        throw new Error(res.statusText);
    });
}

export function getMovieById(id) {
    return fetch(`${api}/movies/${id}`).then(res => res.json());
}

export function getMovieByTitle(title) {
	return fetch(`${api}/filter-movie`, {
    	method: 'POST',
    	headers: {
    		'content-type': 'application/json'
    	},
    	body: JSON.stringify({ title})
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        }
        throw new Error(res.statusText);
    });
}

export function createUser(login, password) {
    return fetch(`${api}/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ login, password })
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        }
        throw new Error(res.statusText);
    });
}

export function authUser(login, password) {
    return fetch(`${api}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ login, password })
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        }
        throw new Error(res.statusText);
    });
}

export function createComment(description, movieId) {
    return fetch(`${api}/comments`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ description, movieId })
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        }
        throw new Error(res.statusText);
    });
}


export function getCommentByMovieId(id) {
    return fetch(`${api}/select-comments`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({id})
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        }
        throw new Error(res.statusText);
    });
}


export function addLike(id) {
    return fetch(`${api}/add-like`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ id })
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        }
        throw new Error(res.statusText);
    });
}