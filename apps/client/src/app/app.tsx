import './app.css';
import { useState } from 'react';
import { Room } from 'colyseus.js';
import Lobby from '../components/lobby/lobby';
import Game from '../components/game/game';
import React from 'react';

type GameState = 'Lobby' | 'Game';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('Lobby');
  const [roomState, setRoomState] = useState<Room>();

  const matchJoinedCallback = (room: Room) => {
    setGameState((state) => 'Game');
    setRoomState((roomState) => room);
  };

  return (
    <div>
      {gameState === 'Lobby' && (
        <Lobby matchJoinedCallback={matchJoinedCallback} />
      )}
      {gameState === 'Game' && <Game room={roomState} />}
    </div>
  );
}
