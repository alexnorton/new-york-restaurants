import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const GRADES = ['A', 'B', 'C', 'Pending', 'Not Yet Graded', 'Unknown'];

function GradeFilter({ current, onGradeChange }) {
  const currentGrades = current || [];

  return (
    <FormGroup tag="fieldset">
      <legend>Grade</legend>
      {GRADES.map((grade, index) => (
        <FormGroup key={grade} check>
          <Label check>
            <Input
              id={`grade-${index}`}
              checked={currentGrades.indexOf(grade) !== -1}
              onChange={event => {
                if (event.target.checked) {
                  onGradeChange([...currentGrades, grade]);
                  return;
                }
                onGradeChange([
                  ...currentGrades.slice(0, currentGrades.indexOf(grade)),
                  ...currentGrades.slice(currentGrades.indexOf(grade) + 1),
                ]);
              }}
              type="checkbox"
            />
            {grade}
          </Label>
        </FormGroup>
      ))}
    </FormGroup>
  );
}

export default GradeFilter;
