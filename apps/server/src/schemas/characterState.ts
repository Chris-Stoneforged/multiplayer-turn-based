import { Schema, MapSchema, type } from '@colyseus/schema';
import { CharacterConfig, CharacterType } from '../game/config/characterConfig';
import { MatchState } from './matchState';
import ActionState from './actionState';
import { createActionFromId } from '../game/actions/actionFactory';
import { TargetData } from '../game/targeting/targetTypes';
import { ICharacterState } from '@multiplayer-turn-based/common';
import ResourceState from './resourceState';

export class CharacterState extends Schema implements ICharacterState {
  @type('string') name: string;
  @type(ResourceState) health: ResourceState;
  @type({ map: ActionState }) actions = new MapSchema<ActionState>();

  id: string;
  owner: string;
  class: CharacterType;

  constructor(state: MatchState, owner: string, config: CharacterConfig) {
    super();

    this.name = config.name;
    this.owner = owner;
    this.health = new ResourceState(config.maxHealth);
    this.id = `${owner}_${config.name}`;
    this.class = config.type;

    // Create Actions from Id
    config.actions.forEach((actionId) => {
      this.actions.set(actionId, createActionFromId(actionId, state));
    });
  }

  castAction(actionId: string, targetData: TargetData) {
    const action = this.actions.get(actionId);
    if (action === undefined) {
      throw new Error(`No action with ID ${actionId}`);
    }

    action.cast(this, targetData);
  }

  takeDamage(damage: number) {
    this.health.removeResource(damage);
  }
}
