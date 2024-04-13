import config from '@colyseus/tools';
import { monitor } from '@colyseus/monitor';
import { playground } from '@colyseus/playground';
import { MatchRoom } from './rooms/matchRoom';

export default config({
  initializeGameServer: (gameServer) => {
    gameServer.define('match_room', MatchRoom);
  },
  initializeExpress: (app) => {
    if (process.env.NODE_ENV !== 'production') {
      app.use('/', playground);
    }
    app.use('/colyseus', monitor());
  },
});
