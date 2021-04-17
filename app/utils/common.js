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
export const parseJwt = ()=>{
  const token = localStorage.getItem(AUTH_TOKEN)
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};
export const getYTVideoCode = (video) => {
  let video_id = video.split('v=')[1];
  let ampersandPosition = video_id.indexOf('&');
  if(ampersandPosition != -1) {
    video_id = video_id.substring(0, ampersandPosition);
  }
  return video_id
}
