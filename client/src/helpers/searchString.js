import { stringify, parse } from 'query-string';

const OPTIONS = { arrayFormat: 'bracket' };

export function objectToSearchString(object) {
  return '?' + stringify(object, OPTIONS);
}

export function searchStringToObject(searchString) {
  return parse(searchString, OPTIONS);
}
