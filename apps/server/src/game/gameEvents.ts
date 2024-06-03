import { TypedEmitter } from 'tiny-typed-emitter';
import { CharacterState } from '../schemas/characterState';

interface MatchEvents {
  player_joined: (playerId: string) => void;
  character_spawned: (character: CharacterState) => void;
  match_started: () => void;
  turn_ended: (playerId: string, characterId: string) => void;
  turn_started: (playerId: string, characterId: string) => void;
  character_died: (character: CharacterState) => void;
}

export default class MatchEventBus extends TypedEmitter<MatchEvents> {
  constructor() {
    super();
  }
}
