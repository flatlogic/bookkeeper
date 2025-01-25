import axios from 'axios';

import { isEmpty } from '../services/string';
import config from '../config';

const { API_HOST_URL } = config[process.env.NODE_ENV];

export default class Api {
  static baseUrl = API_HOST_URL;

  static get(url, params, config, format = 'json') {
    return Api.request('GET', url, params, config, format);
  }

  static post(url, params, config, format = 'json') {
    return Api.request('POST', url, params, config, format);
  }

  static put(url, params, config, format = 'json') {
    return Api.request('PUT', url, params, config, format);
  }

  static patch(url, params, config, format = 'json') {
    return Api.request('PATCH', url, params, config, format);
  }

  static delete(url, params, config, format = 'json') {
    return Api.request('DELETE', url, params, config, format);
  }

  static request(method, url, body, config = {}) {
    let apiUrl = url;
    if (apiUrl.indexOf('http') !== 0) {
      apiUrl = `${config.baseUrl || Api.baseUrl}${apiUrl}`;
    }

    const fetchConfig = {
      method,
      withCredentials: true,
      headers: {
        ...(config.headers || {}),
        Authorization: localStorage.getItem('jwt'),
      },
      redirect: 'follow',
    };

    if ((method === 'POST' || method === 'PUT') && body) {
      fetchConfig.data = body;
    } else if (method === 'GET' && body) {
      const queryParams = Object.keys(body)
        .map(key => !isEmpty(body[key]) && `${key}=${body[key]}`)
        .filter(value => !!value)
        .join('&');

      if (queryParams) {
        apiUrl += (apiUrl.includes('?') ? '&' : '?') + queryParams;
      }
    }
    fetchConfig.url = apiUrl;

    const { CancelToken } = axios;
    const source = CancelToken.source();
    fetchConfig.cancelToken = source.token;

    const request = axios(fetchConfig)
      .then(response => response.data)
      .catch(e => {
        if (e.response && e.response.status === 401 && !fetchConfig.url.includes('/login')) {
          // const responseData = e.response.data;
          axios.post(`${config.baseUrl || Api.baseUrl}/logout`);
          // setTimeout(() => {
          //   window.onbeforeunload = () => window.localStorage.clear();
          //   const authType = get(responseData, 'message.auth_type');
          //   const url = authType === 'token' ? '#/widgets-logout' : '#/logout';
          //   routeHelper.redirect(url);
          // }, 10);
        }
        throw e;
      });

    return request;
  }
}
