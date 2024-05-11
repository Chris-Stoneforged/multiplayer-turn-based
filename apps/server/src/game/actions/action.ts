import { TargetConfig, TargetData } from '../targeting/targetTypes';
import {
  resolveTargets,
  validateTargetData,
} from '../targeting/targetResolver';
import { MatchState } from '../../schemas/matchState';

export default abstract class Action {
  abstract targetConfig: TargetConfig;
  abstract name: string;

  game: MatchState;

  constructor(match: MatchState) {
    this.game = match;
  }

  cast(caster: string, targetData: TargetData): void {
    if (!validateTargetData(this.targetConfig, targetData)) {
      throw new Error(`Invalid Target`);
    }

    const targets = resolveTargets();
    this.onCast(caster, targets);
  }

  abstract onCast(caster: string, targets: string[]): void;
}
