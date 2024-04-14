// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import './app.css';
import { useEffect, useState } from 'react';
import client from './colyseusClient';
import { Room } from 'colyseus.js';

export function App() {
  const [gameState, setGameState] = useState('');
  const [roomState, setRoomState] = useState<Room>();
  const [currentTurnState, setCurrentTurnState] = useState('');

  useEffect(() => {
    setGameState('canJoin');
  }, []);

  const onJoinButtonClick = async () => {
    setGameState('joining');
    try {
      const room: Room = await client.joinOrCreate('match_room');
      setRoomState(room);

      let numPlayers = 0;
      room.state.players.onAdd(() => {
        numPlayers++;
        if (numPlayers === 2) {
          setGameState('joined');
          console.log(`Joined room ${room.sessionId}`);
        }
      });
      room.state.listen('currentTurn', (currentTurn: string) => {
        setCurrentTurnState(currentTurn);
      });
    } catch (error) {
      setGameState('canJoin');
      console.log(`Error joining room - ${error}`);
    }
  };

  const onEndTurnButtonClicked = () => {
    if (roomState !== undefined) {
      roomState.send('end_turn');
    }
  };

  return (
    <div>
      <h1 className="game_title">Turn-Based Combat Game</h1>
      <main>
        <div className="match_container">
          {gameState === 'canJoin' && (
            <button
              className="join_match_button"
              onClick={() => onJoinButtonClick()}
            >
              Join Match
            </button>
          )}
          {gameState === 'joining' && (
            <h3 className="info_text">Finding Match...</h3>
          )}
          {gameState === 'joined' && (
            <div>
              <h3 className="info_text">
                {currentTurnState === roomState?.sessionId
                  ? 'Your turn'
                  : 'Enemy turn'}
              </h3>
              <button
                disabled={currentTurnState !== roomState?.sessionId}
                className="join_match_button"
                onClick={() => onEndTurnButtonClicked()}
              >
                End Turn
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
