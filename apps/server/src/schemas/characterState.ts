import { Schema, MapSchema, type } from '@colyseus/schema';
import { MatchState } from './matchState';
import ActionState from './actionState';
import { ICharacterState } from '@multiplayer-turn-based/common';
import ResourceState, { HealthState } from './resourceState';
import {
  CharacterConfig,
  CharacterType,
  TargetData,
} from '@multiplayer-turn-based/common';
import ResourcesState from './resourcesState';

export class CharacterState extends Schema implements ICharacterState {
  @type('string') name: string;
  @type(HealthState) health: HealthState;
  @type(ResourcesState) resources: ResourcesState;
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
    this.health = new HealthState(config.maxHealth);
    this.resources = new ResourcesState({ manaValue: config.maxMana });
    this.id = `${owner}_${config.name}`;
    this.class = config.type;
    this.isAlive = true;
    this.match = state;

    // Create Actions from Id
    config.actions.forEach((actionId) => {
      this.actions.set(actionId, new ActionState(actionId, this.match));
    });
  }

  castAction(actionId: string, targetData: TargetData) {
    const action = this.actions.get(actionId);
    if (action === undefined) {
      throw new Error(`No action with ID ${actionId}`);
    }

    if (!this.resources.canAffordCost(action.definition.cost)) {
      throw new Error(`Can't afford action ${actionId}`);
    }

    action.cast(this, targetData);
    this.resources.subtractCost(action.definition.cost);
  }

  takeDamage(damage: number) {
    this.health.removeResource(damage);
    if (this.health.currentValue <= 0) {
      this.isAlive = false;
      this.match.events.emit('character_died', this);
    }
  }
}
