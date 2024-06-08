import { ICharacterDefinition } from './gameTypes';

const bob: ICharacterDefinition = {
  id: 'Bob',
  type: 'Hero',
  maxHealth: 12,
  maxMana: 2,
  actions: ['fireball'],
};

const jim: ICharacterDefinition = {
  id: 'Jim',
  type: 'Hero',
  maxHealth: 10,
  maxMana: 3,
  actions: ['fireball'],
};

export const characterDefinitions = {
  Bob: bob,
  Jim: jim,
};

export type CharacterId = keyof typeof characterDefinitions;

export function getCharacterDefinitionById(
  id: CharacterId
): ICharacterDefinition {
  return characterDefinitions[id];
}
