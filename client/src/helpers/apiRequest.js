async function apiRequest(path, params = {}) {
  const urlParams = new URLSearchParams(params).toString();

  let url = `/api/${path}`;

  if (urlParams !== '') {
    url += `?${urlParams}`;
  }

  const res = await fetch(url);
  const body = await res.json();

  return body;
}

export default apiRequest;
