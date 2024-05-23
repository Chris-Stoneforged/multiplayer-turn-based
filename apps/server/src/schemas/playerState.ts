import { Schema, MapSchema, type } from '@colyseus/schema';
import { IPlayerState } from '@multiplayer-turn-based/common';
import { CharacterState } from './characterState';

export class PlayerState extends Schema implements IPlayerState {
  @type({ map: CharacterState }) characters = new MapSchema<CharacterState>();
  @type('string') name: string;

  constructor(id: string) {
    super();

    this.name = `player_${id}`;
  }
}
