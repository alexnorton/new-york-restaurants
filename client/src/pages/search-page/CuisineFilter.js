import React, { useState, useEffect } from 'react';

function CuisineFilter({ onCuisineChange }) {
  const [cuisines, setCuisines] = useState([]);
  const [selected, setSelected] = useState(null);

  function handleChange({ target: { value } }) {
    const cuisine = value === "" ? null : value;
    setSelected(cuisine);
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
    <select value={selected || ""} onChange={handleChange}>
      <option value="">[All cuisines]</option>
      {cuisines.map(cuisine => (
        <option key={cuisine}>{cuisine}</option>
      ))}
    </select>
  );
}

export default CuisineFilter;
