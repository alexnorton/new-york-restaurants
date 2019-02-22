import { objectToSearchString, searchStringToObject } from './searchString';

describe('objectToSearchString', () => {
  it('converts objects to search strings successfully', () => {
    const object = {
      page: 3,
      cuisine: 'Thai',
      grades: ['A', 'B'],
      something: undefined,
    };
    const searchString = objectToSearchString(object);
    expect(searchString).toEqual('?cuisine=Thai&grades[]=A&grades[]=B&page=3');
  });
});

describe('searchStringToObject', () => {
  const searchString = '?cuisine=Thai&grades[]=A&grades[]=B&page=3';
  const object = searchStringToObject(searchString);
  expect(object).toEqual({
    page: '3',
    cuisine: 'Thai',
    grades: ['A', 'B'],
  });
});
