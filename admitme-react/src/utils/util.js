export const uriBuilder = (url, queries) => {
  var newUrl = url;
  queries = queries || [];
  for (var i = 0; i < queries.length; i++) {
    newUrl = newUrl + (i === 0 ? "?" : "&");
    newUrl = newUrl + encodeURIComponent(queries[i].key) + "=" + encodeURIComponent(queries[i].value);
  }
  return newUrl;
};
