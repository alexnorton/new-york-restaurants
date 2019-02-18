function objectToSearchString(params) {
  const paramsCopy = { ...params };

  for (const key in paramsCopy) {
    if (!paramsCopy[key]) {
      delete paramsCopy[key];
    }
  }

  return '?' + new URLSearchParams(paramsCopy).toString();
}

export default objectToSearchString;
