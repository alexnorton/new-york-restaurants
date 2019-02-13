import React, { useState, useEffect } from 'react';
import SearchResults from './SearchResults';
import Pagination from './Pagination';

function SearchPage() {
  const [page, setPage] = useState(1);
  const [result, setResult] = useState();

  async function fetchResult() {
    const res = await fetch(`/api/restaurants?page=${page}`);
    const body = await res.json();

    setResult(body);
  }

  useEffect(() => {
    fetchResult();
  }, [page]);

  return (
    <div>
      <h2>Search</h2>
      {result && (
        <>
          <Pagination
            current={page}
            total={result.pages}
            onPageChange={setPage}
          />
          <p>{result.total} restaurants found</p>
          <SearchResults results={result.results} />
        </>
      )}
    </div>
  );
}

export default SearchPage;
