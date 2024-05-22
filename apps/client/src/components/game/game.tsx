import { Room } from 'colyseus.js';
import './game.css';
import CharacterContainer from '../characterDetails/characterContainer';
import { IPlayer } from '@multiplayer-turn-based/common';
import { ICharacter } from 'common/src/gameDefinitions';

type GameProps = {
  room: Room | undefined;
};

export default function Game({ room }: GameProps) {
  const thisPlayer: IPlayer = room?.state.players.get(room.sessionId);
  const characters: Map<string, ICharacter> = thisPlayer.characters;
  return (
    <main>
      <div className="match_container">
        <CharacterContainer characters={characters}></CharacterContainer>
      </div>
    </main>
  );
}
