import {APIMiddleware} from '../common/utils/';
import {apiUrls} from '../common/constants';

const {PROGRESS_URL} = apiUrls;

export function getProgress() {
  const url = `${PROGRESS_URL}`;
  return APIMiddleware.get(url);
}
