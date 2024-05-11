import { TargetConfig } from '../targeting/targetTypes';
import Action from './action';

export default class Fireball extends Action {
  name = 'Fireball';
  damageAmount = 5;
  targetConfig: TargetConfig = {
    targetType: 'Selected',
    targetClass: 'All',
    targetAlliance: 'Enemy',
    targetCount: 1,
  };

  onCast(caster: string, targets: string[]): void {
    const target = this.game.characters.get(targets[0]);
    target.takeDamage(this.damageAmount);
  }
}
