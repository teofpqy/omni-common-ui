import isomorphicFetch from 'isomorphic-fetch';
import is from 'is_js';
import Store from 'domain/Store';

export const buildUrl = (path) => CONFIG.apiBase + path;

class FetchTimedOutError extends Error { }

export const fetch = (url, options = {}) => {
  const finalOptions = Object.assign({}, options, getTokenHeader(options));
  return new Promise((resolve, reject) => {
    const onTimeout = () => reject(new FetchTimedOutError(`Call to ${url} has taken too long!`));
    const timeout = setTimeout(onTimeout, CONFIG.fetchTimeout);

    isomorphicFetch(url, finalOptions)
      .then(checkResponseStatus)
      .then((response) => response.text())
      .then((response) => {
        if (is.empty(response)) {
          return response;
        }

        return JSON.parse(response);
      })
      .then((response) => {
        clearTimeout(timeout);
        resolve(response);
      })
      .catch((error) => {
        clearTimeout(timeout);
        reject(error);
      });
  });
};

function checkResponseStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function getTokenHeader(options) {
  const user = Store.get().getState().get('singleSignOn').user || {};
  const token = user.access_token;
  return {
    headers: Object.assign(
      {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      is.not.object(options) ? undefined : options.headers
    ),
  };
}

class Api { }

Api.fetch = fetch;
Api.buildUrl = buildUrl;

export default Api;
