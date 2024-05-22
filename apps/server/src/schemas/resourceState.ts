import { Schema, type } from '@colyseus/schema';
import { IResource } from '@multiplayer-turn-based/common';

export default class ResourceState extends Schema implements IResource {
  @type('number') maxValue: number;
  @type('number') currentValue: number;

  constructor(maxValue: number) {
    super();
    this.maxValue = maxValue;
    this.currentValue = this.maxValue;
  }

  giveResource(amount: number) {
    this.currentValue = Math.min(this.currentValue + amount, this.maxValue);
  }

  removeResource(amount: number) {
    this.currentValue -= amount;
  }
}
