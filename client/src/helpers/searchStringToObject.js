function searchStringToObject(searchString) {
  const params = new URLSearchParams(searchString.substring(1));

  const object = {};

  for (const [key, value] of params.entries()) {
    object[key] = value;
  }

  return object;
}

export default searchStringToObject;
