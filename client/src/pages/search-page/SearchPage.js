import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import useApiRequest from '../../helpers/useApiRequest';
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

  useEffect(() => {
    const search = objectToSearchString(params);

    if (props.location.search !== search) {
      props.history.push({ search });
    }
  }, [params]);

  const { loading, error, data } = useApiRequest('restaurants', params);

  let content;

  if (loading) {
    content = 'Loading...';
  } else if (error) {
    content = `Error loading results: ${error.message}`;
  } else {
    content = (
      <>
        <p className="text-right">{data.total} restaurants found</p>
        <SearchResults results={data.results} />
        <Pagination
          current={params.page}
          total={data && data.pages}
          onPageChange={page => {
            setParams({ ...params, page });
            window.scrollTo(0, 0);
          }}
        />
      </>
    );
  }

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
        <Col xs="8">{content}</Col>
      </Row>
    </div>
  );
}

export default SearchPage;
