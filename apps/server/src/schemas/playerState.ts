import { Schema, type } from '@colyseus/schema';

export class PlayerState extends Schema {
  @type('string') name: string;

  constructor(id: string) {
    super();

    this.name = `player_${id}`;
  }
}
