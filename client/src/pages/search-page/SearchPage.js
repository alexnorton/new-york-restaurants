import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import apiRequest from '../../helpers/apiRequest';
import {
  searchStringToObject,
  objectToSearchString,
} from '../../helpers/searchString';
import SearchResults from './SearchResults';
import Pagination from './Pagination';
import CuisineFilter from './CuisineFilter';
import GradeFilter from './GradeFilter';

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
      <Row>
        <Col xs={2}>
          <h2>Search</h2>
          <CuisineFilter
            current={params.cuisine}
            onCuisineChange={cuisine =>
              setParams({ ...params, page: 1, cuisine })
            }
          />
          <GradeFilter
            current={params.grade}
            onGradeChange={grade => setParams({ ...params, page: 1, grade })}
          />
        </Col>
        <Col xs="8">
          {result && (
            <>
              <p className="text-right">{result.total} restaurants found</p>
              <SearchResults results={result.results} />
              <Pagination
                current={params.page}
                total={result && result.pages}
                onPageChange={page => {
                  setParams({ ...params, page });
                  window.scrollTo(0, 0);
                }}
              />
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default SearchPage;
