import React from 'react';
import useApiRequest from '../../helpers/useApiRequest';
import Loading from '../../components/Loading';
import Inspection from './Inspection';

function RestaurantPage(props) {
  const { loading, error, data } = useApiRequest(
    `restaurants/${props.match.params.camis}`
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading restaurant: ${error.message}</div>;
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
  } = data;

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
