import React from 'react';
import { Link } from 'react-router-dom';

function SearchResult({
  result: {
    camis,
    name,
    cuisine,
    building,
    street,
    borough,
    zipCode,
    phone,
    lastInspectionDate,
    lastInspectionGrade,
    lastInspectionScore,
  },
}) {
  return (
    <div>
      <Link to={`/${camis}`}>
        <h3>{name}</h3>
      </Link>
      <p>
        <strong>Cuisine:</strong> {cuisine}
        <br />
        <strong>Address:</strong> {building} {street}, {borough}, {zipCode}
        <br />
        <strong>Phone:</strong> {phone}
      </p>
      <h4>Last inspection</h4>
      <p>
        <strong>Date:</strong> {lastInspectionDate}
        <br />
        <strong>Grade:</strong> {lastInspectionGrade}
        <br />
        <strong>Score:</strong> {lastInspectionScore}
      </p>
    </div>
  );
}

export default SearchResult;
