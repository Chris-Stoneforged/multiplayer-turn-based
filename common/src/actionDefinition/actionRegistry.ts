import { IActionDefinition } from '../gameTypes';
import { fireball } from './fireball';

const actionDefinitions = {
  fireball: fireball,
};

export type ActionId = keyof typeof actionDefinitions;

export function getActionDefinitionById(
  id: ActionId
): IActionDefinition | undefined {
  return actionDefinitions[id];
}
