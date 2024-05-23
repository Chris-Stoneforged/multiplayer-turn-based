import './game.css';
import CharacterContainer from '../characterDetails/characterContainer';
import TurnButton from './turnButton';
import AbilityButton from '../abilities/abilityButton';
import { IMatchState } from '@multiplayer-turn-based/common';
import { Room } from 'colyseus.js';

type GameProps = {
  room: Room<IMatchState>;
};

export default function Game({ room }: GameProps) {
  return (
    <main>
      <div className="match_container">
        <CharacterContainer
          characters={room.state.players.get(room.sessionId)!.characters}
        />
        <AbilityButton room={room} />
        <TurnButton room={room} />
      </div>
    </main>
  );
}
