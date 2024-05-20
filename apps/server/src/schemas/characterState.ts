import { Schema, type } from '@colyseus/schema';
import { CharacterConfig, CharacterType } from '../game/config/characterConfig';
import { MatchState } from './matchState';
import Action from './actionState';
import { createActionFromId } from '../game/actions/actionFactory';
import { TargetData } from '../game/targeting/targetTypes';

export class CharacterState extends Schema {
  @type('number') health: number;

  id: string;
  owner: string;
  // TODO: convert to schema
  actions: Map<number, Action>;
  class: CharacterType;

  constructor(state: MatchState, owner: string, config: CharacterConfig) {
    super();

    this.owner = owner;
    this.health = config.maxHealth;
    this.id = `${owner}_${config.name}`;
    this.class = config.type;
    this.actions = new Map<number, Action>();

    // Create Actions from Id
    config.actions.forEach((actionId) => {
      this.actions.set(actionId, createActionFromId(actionId, state));
    });
  }

  castAction(actionId: number, targetData: TargetData) {
    const action = this.actions.get(actionId);
    if (action === null) {
      throw new Error('No action with ID');
    }

    action.cast(this, targetData);
  }

  takeDamage(damage: number) {
    this.health -= damage;
  }
}
