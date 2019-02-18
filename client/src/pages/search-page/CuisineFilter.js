import React, { useState, useEffect } from 'react';
import { FormGroup, Input } from 'reactstrap';
import apiRequest from '../../helpers/apiRequest';

function CuisineFilter({ current, onCuisineChange }) {
  const [cuisines, setCuisines] = useState([]);

  function handleChange({ target: { value } }) {
    const cuisine = value === '' ? undefined : value;
    onCuisineChange(cuisine);
  }

  async function fetchCuisines() {
    const apiResult = await apiRequest(`cuisines`);

    setCuisines(apiResult);
  }

  useEffect(() => {
    fetchCuisines();
  }, []);

  return (
    <FormGroup>
      <legend>Cuisine</legend>
      <Input type="select" value={current || ''} onChange={handleChange}>
        <option value="">[All cuisines]</option>
        {cuisines.map(cuisine => (
          <option key={cuisine}>{cuisine}</option>
        ))}
      </Input>
    </FormGroup>
  );
}

export default CuisineFilter;
