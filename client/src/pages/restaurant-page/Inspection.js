import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';

function Inspection({ startOpen, inspection }) {
  const [open, setOpen] = useState(startOpen);

  return (
    <Card className="mb-2">
      <CardHeader
        tag="h4"
        onClick={() => setOpen(!open)}
        style={{ cursor: 'pointer', borderBottom: !open && 'none' }}
      >
        {new Date(inspection.date).toLocaleDateString()}
      </CardHeader>
      <CardBody style={{ display: !open && 'none' }}>
        <p className="mb-0">
          <strong>Type:</strong> {inspection.type}
          <br />
          <strong>Grade:</strong> {inspection.grade}
          <br />
          <strong>Score:</strong> {inspection.score}
          <br />
          <strong>Action:</strong> {inspection.action}
        </p>
        {inspection.violations.length > 0 && (
          <>
            <h5 className="mt-3">Violations</h5>
            <ul className="mb-0">
              {inspection.violations.map(
                ({ violationId, code, description, criticalFlag }) => (
                  <li key={violationId}>
                    {code} - {description} ({criticalFlag})
                  </li>
                )
              )}
            </ul>
          </>
        )}
      </CardBody>
    </Card>
  );
}

export default Inspection;
