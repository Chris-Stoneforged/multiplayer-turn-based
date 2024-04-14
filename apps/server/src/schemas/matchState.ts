import { Schema, MapSchema, ArraySchema, type } from '@colyseus/schema';
import { PlayerState } from './playerState';

export class MatchState extends Schema {
  @type('string') currentTurn: string;
  @type({ map: PlayerState }) characters = new MapSchema<PlayerState>();
  @type(['string']) players = new ArraySchema<string>();
}
