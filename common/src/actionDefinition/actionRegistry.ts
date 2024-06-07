import { IActionDefinition } from '../gameTypes';
import { fireball } from './fireball';

const actionDefinitions: { [id: string]: IActionDefinition } = {
  fireball: fireball,
};

export function getActionDefinitionById(
  id: string
): IActionDefinition | undefined {
  return actionDefinitions[id];
}
