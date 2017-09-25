import React, { Component } from 'react';
import { Route } from 'react-router';

import MoviesList from './MoviesList.jsx';
import MoviePage from './MoviePage.jsx';
import LoginPage from './LoginPage.jsx';
import AddMovie from './AddMovie.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={MoviesList} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/movie/:id" component={MoviePage} />
        <Route exact path="/add-movie" component={AddMovie} />
      </div>
    );
  }
}

export default App;