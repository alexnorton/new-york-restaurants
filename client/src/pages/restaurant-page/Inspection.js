import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import GradeBadge from '../../components/GradeBadge';

function Inspection({ startOpen, inspection }) {
  const [open, setOpen] = useState(startOpen);

  return (
    <Card className="mb-2">
      <CardHeader
        onClick={() => setOpen(!open)}
        className={`d-flex align-items-center cursor-pointer ${!open &&
          'border-bottom-0'}`}
      >
        <h4 className="flex-grow-1 mb-0">
          {new Date(inspection.date).toLocaleDateString()}
        </h4>
        <GradeBadge grade={inspection.grade} size={45} fontSize={20} />
      </CardHeader>
      {open && (
        <CardBody>
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
      )}
    </Card>
  );
}

export default Inspection;
