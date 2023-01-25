import {APIMiddleware} from '../common/utils/';
import {apiUrls} from '../common/constants';

const {TOPICS_URL} = apiUrls;

export function getTopics(specialtyId) {
  const url = `${TOPICS_URL}/${specialtyId}`;
  return APIMiddleware.get(url);
}
