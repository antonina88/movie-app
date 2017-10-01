import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

import MoviesList from './MoviesList.jsx';
import MoviePage from './MoviePage.jsx';
import LoginPage from './LoginPage.jsx';
import AddMovie from './AddMovie.jsx';
import MostLiked from './MostLiked.jsx';
import MostCommented from './MostCommented.jsx';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={MoviesList} />
        <Route path="/login" component={LoginPage} />
        <Route path="/movie/:id" component={MoviePage} />
        <Route path="/add-movie" component={AddMovie} />
        <Route path="/most-liked" component={MostLiked} /> 
        <Route path="/most-commented" component={MostCommented} /> 
      </Switch>
    );
  }
}

export default App;