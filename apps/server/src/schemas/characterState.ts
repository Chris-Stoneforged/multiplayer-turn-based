import { Schema, MapSchema, type } from '@colyseus/schema';
import { MatchState } from './matchState';
import ActionState from './actionState';
import { createActionFromId } from '../game/actions/actionFactory';
import { ICharacterState } from '@multiplayer-turn-based/common';
import ResourceState from './resourceState';
import { CharacterConfig, CharacterType, TargetData } from '../game/gameTypes';

export class CharacterState extends Schema implements ICharacterState {
  @type('string') name: string;
  @type(ResourceState) health: ResourceState;
  @type({ map: ActionState }) actions = new MapSchema<ActionState>();
  @type('boolean') isAlive: boolean;

  id: string;
  owner: string;
  class: CharacterType;
  match: MatchState;

  constructor(state: MatchState, owner: string, config: CharacterConfig) {
    super();

    this.name = config.name;
    this.owner = owner;
    this.health = new ResourceState(config.maxHealth);
    this.id = `${owner}_${config.name}`;
    this.class = config.type;
    this.isAlive = true;
    this.match = state;

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
    if (this.health.currentValue <= 0) {
      this.isAlive = false;
      this.match.events.emit('character_died', this);
    }
  }
}
