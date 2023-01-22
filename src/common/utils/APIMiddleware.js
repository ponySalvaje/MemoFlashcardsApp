import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const APIMiddleware = {
  async get(url, config = {}) {
    const {params, responseType} = config;
    const headers = await getHeaders();
    return axios.get(url, {params, headers, responseType});
  },

  async post(
    url,
    config = {
      noAuthToken: false,
      responseType: 'json',
    },
  ) {
    const {params, responseType, data, noAuthToken} = config;
    const headers = noAuthToken ? {} : await getHeaders();
    return axios.post(url, data, {params, headers, responseType});
  },

  async put(url, config = {}) {
    const {params, responseType, data} = config;
    const headers = await getHeaders();
    return axios.put(url, data, {params, headers, responseType});
  },
};

async function getHeaders() {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: 'Bearer ' + token,
  };
  return headers;
}
