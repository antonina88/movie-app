const api = 'http://localhost:8000';

export function listMovies() {
    return fetch(`${api}/movies`, {
        headers: {
          "content-type": "application/json"
        },
        credentials: "include"
      }).then(res => {
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
        credentials: "include",
    	body: JSON.stringify({ title, description, url })
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        }
        throw new Error(res.statusText);
    });
}

export function getMovieById(id) {
    return fetch(`${api}/movies/${id}`, {
        credentials: "include"
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        }
        throw new Error(res.statusText);
    });
}

export function getMovieByTitle(title) {
	return fetch(`${api}/filter-movie`, {
    	method: 'POST',
    	headers: {
    		'content-type': 'application/json'
    	},
        credentials: "include",
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
        credentials: "include",
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
        credentials: "include",
        body: JSON.stringify({ login, password })
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        }
        throw new Error(res.statusText);
    });
}

export function createComment(description, movieId) {
    return fetch(`${api}/add-comment`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({ description, movieId })
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
        credentials: "include",
        body: JSON.stringify({ id })
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        }
        throw new Error(res.statusText);
    });
}

export function removeLike(id) {
    return fetch(`${api}/remove-like`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({ id })
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        }
        throw new Error(res.statusText);
    });
}

export function getAuthorizedUser() {
    return fetch(`${api}/user`, {
        credentials: "include"
      }).then(res => {
        if (res.status === 200) {
            return res.json();
        }
        throw new Error(res.statusText);
    });
}

export function signout() {
    return fetch(`${api}/signout`, {
        credentials: "include"
    }).then(res => {
         if (res.status === 200) {
            return res.json();
        }
        throw new Error(res.statusText);
    });
}
