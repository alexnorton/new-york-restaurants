import React, { useState, useEffect } from 'react';

function CuisineFilter({ current, onCuisineChange }) {
  const [cuisines, setCuisines] = useState([]);

  function handleChange({ target: { value } }) {
    const cuisine = value === '' ? null : value;
    onCuisineChange(cuisine);
  }

  async function fetchCuisines() {
    const res = await fetch(`/api/cuisines`);
    const body = await res.json();

    setCuisines(body);
  }

  useEffect(() => {
    fetchCuisines();
  }, []);

  return (
    <select value={current || ''} onChange={handleChange}>
      <option value="">[All cuisines]</option>
      {cuisines.map(cuisine => (
        <option key={cuisine}>{cuisine}</option>
      ))}
    </select>
  );
}

export default CuisineFilter;
