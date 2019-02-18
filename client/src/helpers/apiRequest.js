function paramsToSearchString(params) {
  const paramsCopy = { ...params };

  for (const key in paramsCopy) {
    if (!paramsCopy[key]) {
      delete paramsCopy[key];
    }
  }

  return new URLSearchParams(paramsCopy).toString();
}

async function apiRequest(path, params = {}) {
  const searchString = paramsToSearchString(params);

  let url = `/api/${path}`;

  if (searchString !== '') {
    url += `?${searchString}`;
  }

  const res = await fetch(url);
  const body = await res.json();

  return body;
}

export default apiRequest;
