import { Schema, type } from '@colyseus/schema';
import { resolveTargets } from '../game/targetResolver';
import { MatchState } from './matchState';
import { CharacterState } from './characterState';
import {
  ActionId,
  IActionDefinition,
  IActionState,
  getActionDefinitionById,
} from '@multiplayer-turn-based/common';
import { TargetData } from '@multiplayer-turn-based/common';
import { ActionCast, getActionCastById } from '../game/actions/actionCast';

export default class ActionState extends Schema implements IActionState {
  @type('string') id: ActionId;
  @type('number') cooldown: number;

  definition: IActionDefinition;
  actionCast: ActionCast;
  game: MatchState;
  castLastTurn: boolean;

  constructor(id: ActionId, match: MatchState) {
    super();
    this.id = id;
    this.definition = getActionDefinitionById(id);
    this.actionCast = getActionCastById(id);
    this.game = match;
  }

  cast(caster: CharacterState, targetData: TargetData): void {
    const targets = resolveTargets(
      this.game,
      caster,
      this.definition.target,
      targetData.selectedTargets
    );

    this.actionCast(caster, targets);

    if (this.definition.cooldown > 0) {
      this.cooldown = this.definition.cooldown;
      this.castLastTurn = true;
    }
  }

  reduceCooldown() {
    if (this.cooldown > 0 && !this.castLastTurn) {
      this.cooldown -= 1;
    }

    if (this.castLastTurn) {
      this.castLastTurn = false;
    }
  }
}
