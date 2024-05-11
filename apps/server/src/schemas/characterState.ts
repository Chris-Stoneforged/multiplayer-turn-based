import { Schema, type } from '@colyseus/schema';
import { CharacterConfig } from '../game/config/characterConfig';
import { MatchState } from './matchState';
import Action from '../game/actions/action';
import { createActionFromId } from '../game/actions/actionFactory';

export class CharacterState extends Schema {
  @type('number') health: number;

  id: string;
  owner: string;
  actions: Action[];

  constructor(state: MatchState, owner: string, config: CharacterConfig) {
    super();

    this.owner = owner;
    this.health = config.maxHealth;

    // Create Actions from Id
    config.actions.forEach((actionId) => {
      this.actions.push(createActionFromId(actionId, state));
    });
  }

  takeDamage(damage: number) {
    this.health -= damage;
  }
}
