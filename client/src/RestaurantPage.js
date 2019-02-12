import React from 'react';

function RestaurantPage(props) {
  return <h2>Restaurant {props.match.params.camis}</h2>;
}

export default RestaurantPage;
