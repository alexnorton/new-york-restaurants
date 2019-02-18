import { objectToSearchString } from './searchString';

async function apiRequest(path, params = {}) {
  const searchString = objectToSearchString(params);

  const url = '/api/' + path + searchString;

  const res = await fetch(url);
  const body = await res.json();

  return body;
}

export default apiRequest;
