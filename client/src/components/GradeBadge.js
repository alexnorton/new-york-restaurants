import React from 'react';

const LETTER_GRADE_COLOURS = {
  A: 'success',
  B: 'warning',
  C: 'danger',
};

function GradeBadge({ size, fontSize, grade, title }) {
  const gradeColour = LETTER_GRADE_COLOURS[grade] || 'secondary';

  return (
    <div
      className={`bg-${gradeColour} rounded-circle text-center text-white d-flex flex-column justify-content-center`}
      style={{
        width: size,
        height: size,
        fontSize: fontSize,
      }}
      title={title}
    >
      {LETTER_GRADE_COLOURS[grade] ? grade : '?'}
    </div>
  );
}

export default GradeBadge;
