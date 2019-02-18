import React, { useState, useEffect } from 'react';
import apiRequest from '../../helpers/apiRequest';
import objectToSearchString from '../../helpers/objectToSearchString';
import SearchResults from './SearchResults';
import Pagination from './Pagination';
import CuisineFilter from './CuisineFilter';
import searchStringToObject from '../../helpers/searchStringToObject';

const DEFAULT_PARAMS = {};

function SearchPage(props) {
  const initialParams =
    props.location.search !== ''
      ? searchStringToObject(props.location.search)
      : DEFAULT_PARAMS;

  const [params, setParams] = useState(initialParams);

  const [result, setResult] = useState();

  async function fetchResult() {
    const apiResult = await apiRequest('restaurants', params);

    setResult(apiResult);
  }

  useEffect(() => {
    const search = objectToSearchString(params);

    if (props.location.search !== search) {
      props.history.push({ search });
    }

    fetchResult();
  }, [params]);

  return (
    <div>
      <h2>Search</h2>
      {result && (
        <>
          <CuisineFilter
            current={params.cuisine}
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
