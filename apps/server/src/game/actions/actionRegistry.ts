import { fireball } from './fireball';
import { IActionDefinition } from '@multiplayer-turn-based/common';

const actionDefinitions: { [id: string]: IActionDefinition } = {
  fireball: fireball,
};

export function getActionDefinitionById(
  id: string
): IActionDefinition | undefined {
  return actionDefinitions[id];
}
