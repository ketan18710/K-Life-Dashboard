import history from 'utils/history';
import { APP_ROUTES, AUTH_TOKEN } from 'utils/constants';
import imageCompression from 'browser-image-compression';
export const redirectToUrl = (endpoint = null) => {
  endpoint ? history.push(endpoint) : null;
};
export const request = (url, options) => {
  if (options.headers) {
    Object.assign(options.headers, { Accept: 'application/json' });
    if (!options.headers.Authorization) {
      options.headers.Authorization = `Bearer ${localStorage.getItem(
        AUTH_TOKEN,
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
  login: auth_token => localStorage.setItem(AUTH_TOKEN, auth_token),
  logout: () => {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.clear();
    redirectToUrl(APP_ROUTES.LOGIN);
  },
};
export const parseJwt = () => {
  const token = localStorage.getItem(AUTH_TOKEN);
  if (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function(c) {
          return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
        })
        .join(''),
    );

    return JSON.parse(jsonPayload);
  }
  return token;
};
export const getYTVideoCode = video => {
  let video_id = video.split('v=')[1];
  const ampersandPosition = video_id.indexOf('&');
  if (ampersandPosition != -1) {
    video_id = video_id.substring(0, ampersandPosition);
  }
  return video_id;
};

function file2base64(file) {
  // debugger
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const MyBlob = new Blob([file], { type: 'text/plain' });
    console.log(' MyBlob instanceof Blob', MyBlob instanceof Blob);
    // debugger
    reader.readAsDataURL(MyBlob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function base642file(dataurl, filename) {
  // debugger
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

async function compressFile(file) {
  let stringifiedFile = '';
  const imageCompress = '';
  let selectedFile = '';
  await file2base64(file).then(data => (stringifiedFile = data));
  console.logI;
  debugger;
  await imageCompress.compressFile(stringifiedFile, -1, 50, 50).then(result => {
    stringifiedFile = result;
    selectedFile = base642file(stringifiedFile, selectedFile.name);
    return selectedFile;
  });
}
async function handleImageUpload(imageFile, suc) {
  // var imageFile = event.target.files[0];
  console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
  console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    console.log(
      'compressedFile instanceof Blob',
      compressedFile instanceof Blob,
    ); // true
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

    await console.log(compressFile());
  } catch (error) {
    debugger;
    console.log(error);
  }
}

export const getUrlParam = param => {
  const loc = window.location.href;
  const params = new URL(loc).searchParams;
  return params.get(param);
};
export const setUrlParam = (param, value) => {
  const loc = window.location.href;
  const url = new URL(loc);
  const params = new URLSearchParams(url.search.slice(1));
  if (params.has(param)) {
    params.set(param, value);
  } else {
    params.append(param, value);
  }
  let newUrl = window.location.href.split('?')[0];
  newUrl = `${newUrl}?${params.toString()}`;
  window.history.pushState('', '', newUrl);
};
export const removeUrlParam = param => {
  const loc = window.location.href;
  const url = new URL(loc);
  const params = new URLSearchParams(url.search.slice(1));
  params.delete(param);
  let newUrl = window.location.href.split('?')[0];
  const len = params.toString();
  if (len.trim().length > 0) {
    newUrl = `${newUrl}?${params.toString()}`;
  }
  window.history.pushState('', '', newUrl);
};
export { compressFile, handleImageUpload };
