import {APIMiddleware} from '../common/utils/';
import {apiUrls} from '../common/constants';

const {SCORE_URL} = apiUrls;

export function scoreCard(cardId, score) {
  const url = `${SCORE_URL}`;
  return APIMiddleware.post(url, {data: {cardId, score}});
}
