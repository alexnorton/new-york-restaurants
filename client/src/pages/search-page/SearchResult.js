import React from 'react';
import { Link } from 'react-router-dom';

const LETTER_GRADE_COLOURS = {
  A: 'success',
  B: 'warning',
  C: 'danger',
};

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
  const gradeColour = LETTER_GRADE_COLOURS[lastInspectionGrade] || 'secondary';

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
      <div
        className={`bg-${gradeColour} rounded-circle text-center text-white d-flex flex-column justify-content-center`}
        style={{
          width: 90,
          height: 90,
          fontSize: LETTER_GRADE_COLOURS[lastInspectionGrade] && 40,
        }}
        title={`Last inspected on ${lastInspectionDate}`}
      >
        {lastInspectionGrade}
      </div>
    </div>
  );
}

export default SearchResult;
