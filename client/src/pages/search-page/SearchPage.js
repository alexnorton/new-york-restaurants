import React, { useState, useEffect } from 'react';
import apiRequest from '../../helpers/apiRequest';
import SearchResults from './SearchResults';
import Pagination from './Pagination';
import CuisineFilter from './CuisineFilter';

function SearchPage() {
  const [params, setParams] = useState({
    page: 1,
    cuisine: null,
  });

  const [result, setResult] = useState();

  async function fetchResult() {
    const apiResult = await apiRequest('restaurants', params);

    setResult(apiResult);
  }

  useEffect(() => {
    fetchResult();
  }, [params]);

  return (
    <div>
      <h2>Search</h2>
      {result && (
        <>
          <CuisineFilter
            onCuisineChange={cuisine => setParams({ page: 1, cuisine })}
          />
          <p>
            <Pagination
              current={params.page}
              total={result.pages}
              onPageChange={page => setParams({ ...params, page })}
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
