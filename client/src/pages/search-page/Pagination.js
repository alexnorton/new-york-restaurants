import React from 'react';
import {
  Pagination as PaginationElement,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';

function Pagination({ current, total, onPageChange }) {
  const currentPage = current ? parseInt(current, 10) : 1;

  return (
    <PaginationElement>
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink
          onClick={() => onPageChange(currentPage - 1)}
          previous
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink>Page {currentPage}</PaginationLink>
      </PaginationItem>
      <PaginationItem disabled={currentPage === total}>
        <PaginationLink onClick={() => onPageChange(currentPage + 1)} next />
      </PaginationItem>
    </PaginationElement>
  );
}

export default Pagination;
