import {APIMiddleware} from '../common/utils/';
import {apiUrls} from '../common/constants';

const {CARDS_URL} = apiUrls;

export function getCards(topicId) {
  const url = `${CARDS_URL}?subjectId=${topicId}&pageNumber=1&pageSize=1000`;
  return APIMiddleware.get(url);
}
