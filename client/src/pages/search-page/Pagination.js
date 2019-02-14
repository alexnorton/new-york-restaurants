import React from 'react';

function Pagination({ current, total, onPageChange }) {
  return (
    <span>
      {current > 1 && (
        <button onClick={() => onPageChange(current - 1)}>Previous</button>
      )}
      Page {current}
      {current < total && (
        <button onClick={() => onPageChange(current + 1)}>Next</button>
      )}
    </span>
  );
}

export default Pagination;
