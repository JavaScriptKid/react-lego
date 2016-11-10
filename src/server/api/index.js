import router from 'koa-router';
import koaBody from 'koa-body';

import fetchCards from './fetch-cards';
import handleError from '../middleware/handle-error';

const parseBody = koaBody();
const apiRouter = router({ prefix: '/api' });

apiRouter.get('/', function getStatus() {
  this.type = 'json';
  this.status = 200;
  this.response.body = { status: 'healthy' };
});

apiRouter.get('/game/:gameType(people|films)/:card1/:card2', parseBody, function* getCards() {
  const cards = [this.params.card1, this.params.card2];
  this.type = 'json';
  this.status = 200;
  this.response.body = yield fetchCards(this.params.gameType, cards);
});

apiRouter.use(handleError());

export default apiRouter;
