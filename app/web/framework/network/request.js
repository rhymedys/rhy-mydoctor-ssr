'use strict';
import axios from 'axios';
// axios.defaults.baseURL = 'http://127.0.0.1:7001';
axios.defaults.timeout = 15000;
axios.defaults.xsrfHeaderName = 'x-csrf-token';
axios.defaults.xsrfCookieName = 'csrfToken';
export default {
  post(url, json, store = {}) {
    const { state = { origin: '' } } = store;
    const headers = {};
    if (EASY_ENV_IS_NODE) {
      headers['x-csrf-token'] = state.csrf;
      headers.Cookie = `csrfToken=${state.csrf}`;
    }

    headers['Access-Control-Allow-Origin'] = 'https://mp.mhealth100.com'

    return axios.post(`${state.origin}/my-doctor-ssr/api/${url}`, json, { headers });
  },
  get(url, store = {}) {
    const { state = { origin: '' } } = store;
    return axios.get(`${state.origin}${url}`);
  }
};