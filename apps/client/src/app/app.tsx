import './app.css';
import { useState } from 'react';
import { Room } from 'colyseus.js';
import Lobby from '../components/lobby/lobby';
import Game from '../components/game/game';
import React from 'react';

export default function App() {
  const [roomState, setRoomState] = useState<Room>();

  const matchJoinedCallback = (room: Room) => {
    setRoomState(room);
  };

  const matchEndedCallback = () => {
    setRoomState(undefined);
  };

  return (
    <div>
      {roomState === undefined && (
        <Lobby matchJoinedCallback={matchJoinedCallback} />
      )}
      {roomState !== undefined && (
        <Game room={roomState} returnToLobby={matchEndedCallback} />
      )}
    </div>
  );
}
