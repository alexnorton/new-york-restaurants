import React from 'react';
import { FormGroup, Input } from 'reactstrap';
import useApiRequest from '../../helpers/useApiRequest';

function CuisineFilter({ current, onCuisineChange }) {
  const { error, data } = useApiRequest('cuisines');

  function handleChange({ target: { value } }) {
    const cuisine = value === '' ? undefined : value;
    onCuisineChange(cuisine);
  }

  let content;

  if (error) {
    content = `Error loading cuisines: ${error}`;
  } else {
    const cuisines = data || [];

    content = (
      <Input type="select" value={current || ''} onChange={handleChange}>
        <option value="">[All cuisines]</option>
        {cuisines.map(cuisine => (
          <option key={cuisine}>{cuisine}</option>
        ))}
      </Input>
    );
  }

  return (
    <FormGroup>
      <legend>Cuisine</legend>
      {content}
    </FormGroup>
  );
}

export default CuisineFilter;
