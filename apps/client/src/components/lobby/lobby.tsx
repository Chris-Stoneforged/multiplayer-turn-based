import './lobby.css';
import React, { useState } from 'react';
import client from '../../colyseusClient';
import { Room } from 'colyseus.js';
import gameConfig, { JoinOptions } from '@multiplayer-turn-based/common';

export type LobbyProps = {
  matchJoinedCallback: (room: Room) => void;
};
type LobbyState = 'Joining' | 'None';

export default function Lobby({ matchJoinedCallback }: LobbyProps) {
  const [lobbyState, setlobbyState] = useState<LobbyState>('None');

  // TODO: Turnt this into a form of sorts
  const joinOptions: JoinOptions = {
    characters: [
      {
        name: 'Bob',
        type: 'Hero',
        maxHealth: 10,
        maxMana: 3,
        actions: ['fireball'],
      },
    ],
  };

  const joinMatch = async () => {
    setlobbyState('Joining');
    try {
      const room: Room = await client.joinOrCreate('match_room', joinOptions);
      let numPlayers = 0;
      room.state.players.onAdd(() => {
        numPlayers++;
        if (numPlayers === gameConfig.numPlayers) {
          matchJoinedCallback(room);
        }
      });
    } catch (error) {
      setlobbyState('None');
      console.log(`Error joining room - ${error}`);
    }
  };

  return (
    <div>
      <h1 className="game_title">Turn-Based Combat Game</h1>
      <main>
        <div className="menu_container">
          {lobbyState === 'None' && (
            <button className="join_match_button" onClick={() => joinMatch()}>
              Join Match
            </button>
          )}
          {lobbyState === 'Joining' && (
            <h3 className="info_text">Finding Match...</h3>
          )}
        </div>
      </main>
    </div>
  );
}
