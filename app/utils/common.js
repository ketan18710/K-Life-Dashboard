import history from 'utils/history';
import {APP_ROUTES,AUTH_TOKEN} from 'utils/constants';
export const redirectToUrl = (endpoint = null) => {
  endpoint ? history.push(endpoint) : null;
}
export const request = (url, options) => {
  if (options.headers) {
    Object.assign(options.headers, { Accept: 'application/json' })
    if (!options.headers.Authorization) {
      options.headers.Authorization = `Bearer ${localStorage.getItem(
        AUTH_TOKEN  ,
      )}`;
    }
  }
  return fetch(url, {
    ...options,
    mode: 'cors',
  })
    .then(response => response.json() || response)
    .then(json => json)
    .catch(err => ({ err }));
};
export const AuthHelper = {
  isAuthenticated: () => !!localStorage.getItem(AUTH_TOKEN),
  login : (auth_token)=>localStorage.setItem(AUTH_TOKEN,auth_token),
  logout : ()=>{localStorage.removeItem(AUTH_TOKEN);localStorage.clear();redirectToUrl(APP_ROUTES.LOGIN)}
}