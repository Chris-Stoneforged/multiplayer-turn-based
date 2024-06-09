import './game.css';
import CharacterContainer from '../characterDetails/characterContainer';
import TurnButton from './turnButton';
import { IMatchState } from '@multiplayer-turn-based/common';
import { Room } from 'colyseus.js';
import PlayerDetails from '../characterDetails/playerDetails';
import ActionSection from '../actions/actionSection';
import Match, { MatchContext } from '../../viewDefinitions/match';
import GameOverScreen from './gameOverScreen';

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
            <CharacterContainer player={game.player} />
          </div>
          <div className="right_section">
            <PlayerDetails player={game.opponent} />
            <CharacterContainer player={game.opponent} />
          </div>
        </div>
        <ActionSection />
        <TurnButton />
        <GameOverScreen returnToLobby={returnToLobby} />
      </div>
    </MatchContext.Provider>
  );
}
