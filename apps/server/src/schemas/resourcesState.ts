import { Schema, type } from '@colyseus/schema';
import ResourceState from './resourceState';
import { ResourceValues } from '@multiplayer-turn-based/common';

export default class ResourcesState extends Schema {
  @type(ResourceState) mana: ResourceState;

  constructor(resources: ResourceValues) {
    super();

    this.mana = new ResourceState(resources.manaValue ?? 0);
  }

  subtractCost(resources: ResourceValues) {
    if (resources.manaValue !== undefined) {
      this.mana.removeResource(resources.manaValue);
    }
  }

  resetResources() {
    this.mana.reset();
  }
}
