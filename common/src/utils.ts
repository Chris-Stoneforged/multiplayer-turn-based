import { IActionDefinition } from './gameTypes';
import { ICharacterState } from './stateDefinitions';

export function canAffordAction(
  character: ICharacterState,
  action: IActionDefinition
): boolean {
  if (
    action.cost.manaValue !== undefined &&
    character.resources.mana.currentValue < action.cost.manaValue
  ) {
    return false;
  }

  return true;
}
