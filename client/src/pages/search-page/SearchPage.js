import React, { useState, useEffect } from 'react';
import SearchResults from './SearchResults';
import Pagination from './Pagination';
import CuisineFilter from './CuisineFilter';

function SearchPage() {
  const [page, setPage] = useState(1);
  const [cuisine, setCuisine]=useState(null);
  const [result, setResult] = useState();

  async function fetchResult() {
    let path = `/api/restaurants?page=${page}`;

    if (cuisine) {
      path += `&cuisine=${cuisine}`;
    }

    const res = await fetch(path);
    const body = await res.json();

    setResult(body);
  }

  useEffect(() => {
    fetchResult();
  }, [page, cuisine]);

  return (
    <div>
      <h2>Search</h2>
      {result && (
        <>
          <CuisineFilter onCuisineChange={setCuisine} />
          <p>
            <Pagination
              current={page}
              total={result.pages}
              onPageChange={setPage}
            />
          </p>
          <p>{result.total} restaurants found</p>
          <SearchResults results={result.results} />
        </>
      )}
    </div>
  );
}

export default SearchPage;
