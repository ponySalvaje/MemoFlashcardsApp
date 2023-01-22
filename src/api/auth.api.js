import {APIMiddleware} from '../common/utils/';
import {apiUrls} from '../common/constants';

const {AUTH_URL} = apiUrls;

export function login(username, password) {
  const url = `${AUTH_URL}`;
  return APIMiddleware.post(url, {
    data: {username, password},
    noAuthToken: true,
  });
}
