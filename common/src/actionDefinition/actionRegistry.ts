import { IActionDefinition } from '../gameTypes';
import { fireball } from './fireball';
import { raiseDead } from './raiseDead';

const actionDefinitions = {
  fireball: fireball,
  raiseDead: raiseDead,
};

export type ActionId = keyof typeof actionDefinitions;

export function getActionDefinitionById(
  id: ActionId
): IActionDefinition | undefined {
  return actionDefinitions[id];
}
