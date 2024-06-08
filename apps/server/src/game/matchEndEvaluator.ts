import { Room } from 'colyseus';
import { CharacterState } from '../schemas/characterState';
import { MatchState } from '../schemas/matchState';

export function standardMatchEndEvaluator(
  room: Room<MatchState>,
  onMatchOver: (winner: string) => void
) {
  const OnCharacterDied = (character: CharacterState) => {
    // Check if all characters belonging to this player have died
    const player = room.state.players.get(character.owner);
    const keys = Array.from(player.characters.keys());
    keys.forEach((key) => {
      const character = player.characters.get(key);
      if (character.isAlive) {
        return;
      }
    });

    // Winner is the player that did not have their character just die
    const playerIds = Array.from(room.state.players.keys());
    const winnerId = playerIds.filter((id) => id !== character.owner)[0];
    onMatchOver(winnerId);
  };

  room.state.events.on('character_died', OnCharacterDied);
}
