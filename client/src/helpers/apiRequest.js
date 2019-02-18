import objectToSearchString from './objectToSearchString';

async function apiRequest(path, params = {}) {
  const searchString = objectToSearchString(params);

  let url = `/api/${path}`;

  if (searchString !== '') {
    url += searchString;
  }

  const res = await fetch(url);
  const body = await res.json();

  return body;
}

export default apiRequest;
