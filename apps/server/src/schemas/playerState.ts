import { Schema, MapSchema, type } from '@colyseus/schema';
import { IPlayer } from '@multiplayer-turn-based/common';
import { CharacterState } from './characterState';

export class PlayerState extends Schema implements IPlayer {
  @type({ map: CharacterState }) characters = new MapSchema<CharacterState>();
  @type('string') name: string;

  constructor(id: string) {
    super();

    this.name = `player_${id}`;
  }
}
