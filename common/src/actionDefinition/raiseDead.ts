import { IActionDefinition } from '../gameTypes';

export const raiseDead: IActionDefinition = {
  cost: {
    manaValue: 1,
  },

  cooldown: 3,
};
