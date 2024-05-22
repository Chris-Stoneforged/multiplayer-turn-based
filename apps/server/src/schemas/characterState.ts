import { Schema, MapSchema, type } from '@colyseus/schema';
import { CharacterConfig, CharacterType } from '../game/config/characterConfig';
import { MatchState } from './matchState';
import Action from './actionState';
import { createActionFromId } from '../game/actions/actionFactory';
import { TargetData } from '../game/targeting/targetTypes';
import { ICharacter } from 'common/src/gameDefinitions';
import ResourceState from './resourceState';

export class CharacterState extends Schema implements ICharacter {
  @type('string') name: string;
  @type(ResourceState) health: ResourceState;

  id: string;
  owner: string;
  // TODO: convert to schema
  actions: Map<number, Action>;
  class: CharacterType;

  constructor(state: MatchState, owner: string, config: CharacterConfig) {
    super();

    this.name = config.name;
    this.owner = owner;
    this.health = new ResourceState(config.maxHealth);
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
    this.health.removeResource(damage);
  }
}
