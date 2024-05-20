import { CharacterState } from '../../schemas/characterState';
import { TargetConfig } from '../targeting/targetTypes';
import Action from '../../schemas/actionState';

export default class Fireball extends Action {
  name = 'Fireball';
  damageAmount = 5;
  targetConfig: TargetConfig = {
    targetType: 'All',
    targetClass: 'All',
    targetAlliance: 'Enemy',
    targetCount: 1,
  };

  onCast(caster: CharacterState, targets: CharacterState[]): void {
    const target = targets[0];
    target.takeDamage(this.damageAmount);
  }
}
