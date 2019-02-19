import React from 'react';
import { Link } from 'react-router-dom';
import GradeBadge from '../../components/GradeBadge';

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
  },
}) {
  return (
    <div className="d-flex align-items-center mb-4">
      <div className="flex-grow-1">
        <Link to={`/${camis}`}>
          <h3>{name}</h3>
        </Link>
        <p className="mb-0">
          <strong>Cuisine:</strong> {cuisine}
          <br />
          <strong>Address:</strong> {building} {street}, {borough}, {zipCode}
          <br />
          <strong>Phone:</strong> {phone}
        </p>
      </div>
      <GradeBadge
        grade={lastInspectionGrade}
        size={90}
        fontSize={40}
        title={`Last inspected on ${new Date(
          lastInspectionDate
        ).toLocaleDateString()}`}
      />
    </div>
  );
}

export default SearchResult;
