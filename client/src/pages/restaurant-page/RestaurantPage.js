import React, { useState, useEffect } from 'react';
import apiRequest from '../../helpers/apiRequest';
import Inspection from './Inspection';

function RestaurantPage(props) {
  const [result, setResult] = useState();

  async function fetchResult() {
    const apiResult = await apiRequest(
      `restaurants/${props.match.params.camis}`
    );

    setResult(apiResult);
  }

  useEffect(() => {
    fetchResult();
  }, []);

  if (!result) {
    return <div>Loading...</div>;
  }

  const {
    name,
    cuisine,
    building,
    street,
    borough,
    zipCode,
    phone,
    inspections,
  } = result;

  const sortedInspections = inspections.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <>
      <h2>{name}</h2>
      <p>
        <strong>Cuisine:</strong> {cuisine}
        <br />
        <strong>Address:</strong> {building} {street}, {borough}, {zipCode}
        <br />
        <strong>Phone:</strong> {phone}
      </p>
      <h3>Inspections</h3>
      {sortedInspections.map((inspection, index) => (
        <Inspection
          key={inspection.inspectionId}
          inspection={inspection}
          startOpen={index === 0}
        />
      ))}
    </>
  );
}

export default RestaurantPage;
