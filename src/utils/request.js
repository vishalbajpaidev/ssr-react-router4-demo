import fetch from 'isomorphic-fetch';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status === 200) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function toQueryString(obj) {
    return Object.keys(obj).map(k => {
        return encodeURIComponent(k) + "=" + encodeURIComponent(obj[k])
    })
        .join("&");
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request({url, options}, query) {
    if(query) {
      url += '?' + toQueryString(query);
    }
    console.log(url,"URL>>>>>>>>>>>>>>>>");
    return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}
