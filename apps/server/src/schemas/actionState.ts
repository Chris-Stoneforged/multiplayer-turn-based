import { Schema, type } from '@colyseus/schema';
import { TargetConfig, TargetData } from '../game/targeting/targetTypes';
import { resolveTargets } from '../game/targeting/targetResolver';
import { MatchState } from './matchState';
import { CharacterState } from './characterState';
import { IActionState } from '@multiplayer-turn-based/common';

export default abstract class ActionState
  extends Schema
  implements IActionState
{
  @type('string') abstract id: string;
  @type('number') cooldown: number;

  protected abstract targetConfig: TargetConfig;

  protected game: MatchState;

  constructor(match: MatchState) {
    super();
    this.game = match;
  }

  canCast(caster: CharacterState): boolean {
    return true;
  }

  cast(caster: CharacterState, targetData: TargetData): void {
    const targets = resolveTargets(
      this.game,
      caster,
      this.targetConfig,
      targetData.selectedTargets
    );
    this.onCast(caster, targets);
  }

  protected abstract onCast(
    caster: CharacterState,
    targets: CharacterState[]
  ): void;
}
