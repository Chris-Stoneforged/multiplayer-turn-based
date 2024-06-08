import './lobby.css';
import React, { useState } from 'react';
import client from '../../colyseusClient';
import { Room } from 'colyseus.js';
import gameConfig, {
  CharacterId,
  JoinOptions,
  characterDefinitions,
  getCharacterDefinitionById,
} from '@multiplayer-turn-based/common';

export type LobbyProps = {
  matchJoinedCallback: (room: Room) => void;
};
type LobbyState = 'Joining' | 'None';

export default function Lobby({ matchJoinedCallback }: LobbyProps) {
  const [lobbyState, setlobbyState] = useState<LobbyState>('None');

  const joinMatch = async (characterId: CharacterId) => {
    setlobbyState('Joining');
    try {
      const room: Room = await client.joinOrCreate('match_room', {
        characters: [getCharacterDefinitionById(characterId)],
      });
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

  const characterKeys = Object.keys(characterDefinitions) as CharacterId[];

  return (
    <div>
      <h1 className="game_title">Turn-Based Combat Game</h1>
      <main>
        <div className="menu_container">
          {lobbyState === 'None' &&
            characterKeys.map((value: CharacterId) => (
              <button
                key={value}
                className="join_match_button"
                onClick={() => joinMatch(value)}
              >
                {`Join as ${value}`}
              </button>
            ))}
          {lobbyState === 'Joining' && (
            <h3 className="info_text">Finding Match...</h3>
          )}
        </div>
      </main>
    </div>
  );
}
