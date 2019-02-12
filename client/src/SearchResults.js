import React from 'react';

import SearchResult from './SearchResult';

function SearchResults({ results }) {
  return (
    <div>
      {results.map(result => (
        <SearchResult result={result} key={result.camis} />
      ))}
    </div>
  );
}

export default SearchResults;
