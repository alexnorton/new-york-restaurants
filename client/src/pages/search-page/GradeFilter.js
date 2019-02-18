import React from 'react';

const GRADES = ['A', 'B', 'C', 'Pending', 'Not Yet Graded', 'Unknown'];

function GradeFilter({ current, onGradeChange }) {
  const currentGrades = current || [];

  return (
    <div>
      {GRADES.map((grade, index) => (
        <div key={grade}>
          <input
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
          <label htmlFor={`grade-${index}`}>{grade}</label>
        </div>
      ))}
    </div>
  );
}

export default GradeFilter;
