import { IActionDefinition } from '@multiplayer-turn-based/common';
import { CharacterState } from '../../schemas/characterState';

export const fireball: IActionDefinition = {
  target: {
    targetType: 'All',
    targetClass: 'All',
    targetAlliance: 'Enemy',
    targetCount: 1,
  },

  cost: {
    manaValue: 5,
  },

  cast: function (caster: CharacterState, targets: CharacterState[]): void {
    const damageAmount = 5;

    const target = targets[0];
    target.takeDamage(damageAmount);
  },
};
