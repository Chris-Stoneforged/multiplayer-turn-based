import './game.css';
import CharacterContainer from '../characterDetails/characterContainer';
import TurnButton from './turnButton';
import { IMatchState } from '@multiplayer-turn-based/common';
import { Room } from 'colyseus.js';
import PlayerDetails from '../characterDetails/playerDetails';
import ActionSection from '../abilities/actionSection';
import Match, { MatchContext } from '../../game/match';
import GameOverScreen from './gameOverScreen';
import { useState } from 'react';

type GameProps = {
  room: Room<IMatchState>;
  returnToLobby: () => void;
};

export default function Game({ room, returnToLobby }: GameProps) {
  const game = Match.Create(room);

  return (
    <MatchContext.Provider value={game}>
      <div className="match_container">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="left_section">
            <PlayerDetails player={game.player} />
            <CharacterContainer
              characters={game.playerCharacters}
              alightLeft={true}
            />
          </div>
          <div className="right_section">
            <PlayerDetails player={game.opponent} />
            <CharacterContainer
              characters={game.opponent.characters}
              alightLeft={false}
            />
          </div>
        </div>
        <ActionSection />
        <TurnButton />
        <GameOverScreen returnToLobby={returnToLobby} />
      </div>
    </MatchContext.Provider>
  );
}
