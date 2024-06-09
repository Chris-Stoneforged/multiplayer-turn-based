import './lobby.css';
import React, { useState } from 'react';
import client from '../../colyseusClient';
import { Room } from 'colyseus.js';
import gameConfig, {
  CharacterId,
  characterDefinitions,
  getCharacterDefinitionById,
} from '@multiplayer-turn-based/common';
import CharacterSelection from './characterSelection';

export type LobbyProps = {
  matchJoinedCallback: (room: Room) => void;
};
type LobbyState = 'Joining' | 'None';

export default function Lobby({ matchJoinedCallback }: LobbyProps) {
  const [lobbyState, setlobbyState] = useState<LobbyState>('None');
  const [selectedCharacter, setSetselectedCharacter] =
    useState<CharacterId>('necromancer');

  const handleCharacterClick = (characterId: CharacterId) => {
    setSetselectedCharacter(characterId);
  };

  const joinMatch = async () => {
    setlobbyState('Joining');
    try {
      const room: Room = await client.joinOrCreate('match_room', {
        characters: [selectedCharacter],
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
              <CharacterSelection
                key={value}
                characterId={value}
                selected={selectedCharacter === value}
                handleClick={handleCharacterClick}
              />
            ))}
          {lobbyState === 'Joining' && (
            <h3 className="info_text">Finding Match...</h3>
          )}
        </div>
        {lobbyState === 'None' && (
          <button className="join_match_button" onClick={() => joinMatch()}>
            Join Match
          </button>
        )}
      </main>
    </div>
  );
}
