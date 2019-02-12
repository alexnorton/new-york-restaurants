import React from 'react';
import { Link } from 'react-router-dom';

function SearchPage() {
  return (
    <div>
      <h2>Search</h2>
      <ul>
        <li>
          <Link to="/123">Restaurant 123</Link>
        </li>
        <li>
          <Link to="/456">Restaurant 456</Link>
        </li>
      </ul>
    </div>
  );
}

export default SearchPage;
