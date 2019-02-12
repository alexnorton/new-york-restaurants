import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SearchPage from './SearchPage';
import RestaurantPage from './RestaurantPage';

function App() {
  return (
    <div className="App">
      <h1>New York Restaurants</h1>
      <Router>
        <div>
          <Route exact path="/" component={SearchPage} />
          <Route path="/:camis" component={RestaurantPage} />
        </div>
      </Router>
    </div>
  );
}

export default App;
