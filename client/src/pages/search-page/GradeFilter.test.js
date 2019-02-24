import { setupChangeHandler } from './GradeFilter';

describe('setupChangeHandler', () => {
  it('adds a grade to an empty list of grades', () => {
    const currentGrades = [];
    const grade = 'B';

    const callback = grades => {
      expect(grades).toEqual(['B']);
    };

    const changeHandler = setupChangeHandler(currentGrades, grade, callback);

    changeHandler({ target: { checked: true } });
  });

  it('adds a grade to a non-empty list of grades', () => {
    const currentGrades = ['A', 'C'];
    const grade = 'Unknown';

    const callback = grades => {
      expect(grades).toEqual(['A', 'C', 'Unknown']);
    };

    const changeHandler = setupChangeHandler(currentGrades, grade, callback);

    changeHandler({ target: { checked: true } });
  });

  it('removes a grade from a non-empty list of grades', () => {
    const currentGrades = ['B', 'C', 'Pending', 'Not Yet Graded'];
    const grade = 'Pending';

    const callback = grades => {
      expect(grades).toEqual(['B', 'C', 'Not Yet Graded']);
    };

    const changeHandler = setupChangeHandler(currentGrades, grade, callback);

    changeHandler({ target: { checked: false } });
  });
});
