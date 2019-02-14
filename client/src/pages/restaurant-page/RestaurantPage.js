import React, { useState, useEffect, Fragment } from 'react';

function RestaurantPage(props) {
  const [result, setResult] = useState();

  async function fetchResult() {
    const res = await fetch(`/api/restaurants/${props.match.params.camis}`);
    const body = await res.json();

    setResult(body);
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
      {inspections.map(
        ({ inspectionId, date, type, grade, score, action, violations }) => (
          <Fragment key={inspectionId}>
            <h4>{date}</h4>
            <p>
              <strong>Type:</strong> {type}
              <br />
              <strong>Grade:</strong> {grade}
              <br />
              <strong>Score:</strong> {score}
              <br />
              <strong>Action:</strong> {action}
            </p>
            <h5>Violations</h5>
            <ul>
              {violations.map(
                ({ violationId, code, description, criticalFlag }) => (
                  <li key={violationId}>
                    {code} - {description} ({criticalFlag})
                  </li>
                )
              )}
            </ul>
          </Fragment>
        )
      )}
    </>
  );
}

export default RestaurantPage;
