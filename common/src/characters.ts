import { ICharacterDefinition } from './gameTypes';

const necromancer: ICharacterDefinition = {
  id: 'necromancer',
  type: 'Hero',
  maxHealth: 12,
  maxMana: 2,
  actions: ['raiseDead'],
};

const pyromancer: ICharacterDefinition = {
  id: 'pyromancer',
  type: 'Hero',
  maxHealth: 10,
  maxMana: 3,
  actions: ['fireball'],
};

const zombie: ICharacterDefinition = {
  id: 'zombie',
  type: 'Minion',
  maxHealth: 3,
  maxMana: 0,
  actions: ['fireball'],
};

export const characterDefinitions = {
  necromancer: necromancer,
  pyromancer: pyromancer,
  zombie: zombie,
};

export type CharacterId = keyof typeof characterDefinitions;

export function getCharacterDefinitionById(
  id: CharacterId
): ICharacterDefinition {
  return characterDefinitions[id];
}
