import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, Navbar, NavbarBrand } from 'reactstrap';

import SearchPage from './pages/search-page';
import RestaurantPage from './pages/restaurant-page';

function App() {
  return (
    <>
      <Navbar color="light" light>
        <Container>
          <NavbarBrand>New York Restaurants</NavbarBrand>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Router>
          <div>
            <Route exact path="/" component={SearchPage} />
            <Route path="/:camis" component={RestaurantPage} />
          </div>
        </Router>
      </Container>
    </>
  );
}

export default App;
