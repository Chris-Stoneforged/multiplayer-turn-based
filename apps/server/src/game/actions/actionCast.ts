import { CharacterState } from '../../schemas/characterState';

export type ActionCast = (
  caster: CharacterState,
  targets: CharacterState[]
) => void;

export function fireball(caster: CharacterState, targets: CharacterState[]) {
  const target = targets[0];
  target.takeDamage(5);
}

const actionCastRegistry: { [id: string]: ActionCast } = {
  fireball: fireball,
};

export function getActionCastById(id: string): ActionCast | undefined {
  return actionCastRegistry[id];
}
