import './game.css';
import CharacterContainer from '../characterDetails/characterContainer';
import TurnButton from './turnButton';
import { IMatchState, IPlayerState } from '@multiplayer-turn-based/common';
import { Room } from 'colyseus.js';
import PlayerDetails from '../characterDetails/playerDetails';
import ActionSection from '../abilities/actionSection';

type GameProps = {
  room: Room<IMatchState>;
};

export default function Game({ room }: GameProps) {
  function getOpponent(): IPlayerState {
    for (const [key, value] of room.state.players) {
      if (key !== room.sessionId) {
        return value;
      }
    }

    throw new Error('No Opponent');
  }

  function getPlayer(): IPlayerState {
    const player = room.state.players.get(room.sessionId);
    if (player == undefined) {
      throw new Error('No Player');
    }

    return player;
  }

  return (
    <div className="match_container">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="left_section">
          <PlayerDetails player={getPlayer()} />
          <CharacterContainer
            characters={getPlayer().characters}
            alightLeft={true}
          />
        </div>
        <div className="right_section">
          <PlayerDetails player={getOpponent()} />
          <CharacterContainer
            characters={getOpponent().characters}
            alightLeft={false}
          />
        </div>
      </div>
      <ActionSection room={room} />
      <TurnButton room={room} />
    </div>
  );
}
