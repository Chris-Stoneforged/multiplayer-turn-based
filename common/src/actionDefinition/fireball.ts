import { IActionDefinition } from '../gameTypes';

export const fireball: IActionDefinition = {
  target: {
    targetType: 'All',
    targetClass: 'All',
    targetAlliance: 'Enemy',
    targetCount: 1,
  },

  cost: {
    manaValue: 2,
  },
};
