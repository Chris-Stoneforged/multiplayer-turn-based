import client from './colyseusClient';

class GameController {
  async JoinMatch() {
    const room = await client.joinOrCreate('match_room');
    console.log(room.sessionId);
  }
}

const gameController = new GameController();
export default gameController;
