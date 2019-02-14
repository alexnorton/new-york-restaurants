import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SearchPage from './pages/search-page';
import RestaurantPage from './pages/restaurant-page';

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
