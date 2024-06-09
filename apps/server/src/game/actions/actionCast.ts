import { CharacterState } from '../../schemas/characterState';
import { MatchState } from '../../schemas/matchState';

export type ActionCast = (
  match: MatchState,
  caster: CharacterState,
  targets: CharacterState[]
) => void;

export function fireball(
  match: MatchState,
  caster: CharacterState,
  targets: CharacterState[]
) {
  const target = targets[0];
  target.takeDamage(5);
}

export function raiseDead(
  match: MatchState,
  caster: CharacterState,
  targets: CharacterState[]
) {
  match.spawnCharacter(caster.owner, 'zombie');
}

const actionCastRegistry: { [id: string]: ActionCast } = {
  fireball: fireball,
  raiseDead: raiseDead,
};

export function getActionCastById(id: string): ActionCast | undefined {
  return actionCastRegistry[id];
}
