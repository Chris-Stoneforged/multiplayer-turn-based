import { Schema, type } from '@colyseus/schema';
import { resolveTargets } from '../game/targeting/targetResolver';
import { MatchState } from './matchState';
import { CharacterState } from './characterState';
import {
  IActionDefinition,
  IActionState,
  getActionDefinitionById,
} from '@multiplayer-turn-based/common';
import { TargetData } from '@multiplayer-turn-based/common';

export default class ActionState extends Schema implements IActionState {
  @type('string') id: string;
  @type('number') cooldown: number;

  definition: IActionDefinition;
  game: MatchState;

  constructor(id: string, match: MatchState) {
    super();
    this.id = id;
    this.definition = getActionDefinitionById(id);
    this.game = match;
  }

  cast(caster: CharacterState, targetData: TargetData): void {
    const targets = resolveTargets(
      this.game,
      caster,
      this.definition.target,
      targetData.selectedTargets
    );
    //this.definition.cast(caster, targets);
  }
}
