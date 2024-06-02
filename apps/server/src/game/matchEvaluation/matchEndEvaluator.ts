import EventEmitter from 'events';
import GameEvents from '../gameEvents';
import { CharacterState } from '../../schemas/characterState';

// TODO: actually calculate this
export function standardMatchEndEvaluator(
  events: EventEmitter,
  onMatchOver: (winner: string) => void
) {
  events.on(GameEvents.OnCharacterDied, (character: CharacterState) => {
    onMatchOver(character.owner);
  });
}
