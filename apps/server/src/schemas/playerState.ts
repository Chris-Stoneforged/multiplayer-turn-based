import { Schema, type } from '@colyseus/schema';

export class PlayerState extends Schema {
  @type('number') health: number;
}
