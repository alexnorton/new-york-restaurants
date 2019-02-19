import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Container, Navbar, NavbarBrand } from 'reactstrap';

import SearchPage from './pages/search-page';
import RestaurantPage from './pages/restaurant-page';

function App() {
  return (
    <Router>
      <div>
        <Navbar color="dark" dark>
          <Container>
            <NavbarBrand tag={Link} to="/">
              New York Restaurants
            </NavbarBrand>
          </Container>
        </Navbar>
        <Container className="my-4">
          <div>
            <Route exact path="/" component={SearchPage} />
            <Route path="/:camis" component={RestaurantPage} />
          </div>
        </Container>
      </div>
    </Router>
  );
}

export default App;
