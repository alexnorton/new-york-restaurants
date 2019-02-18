import React from 'react';

function Pagination({ current, total, onPageChange }) {
  const currentPage = current ? parseInt(current, 10) : 1;

  return (
    <span>
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)}>Previous</button>
      )}
      Page {currentPage}
      {currentPage < total && (
        <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
      )}
    </span>
  );
}

export default Pagination;
