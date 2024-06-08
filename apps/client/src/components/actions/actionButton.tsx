import React, { useContext, useEffect, useState } from 'react';
import './actionButton.css';
import {
  IActionDefinition,
  IActionState,
  ICharacterState,
  canAffordAction,
  getActionDefinitionById,
} from '@multiplayer-turn-based/common';
import {
  ActionViewDefinition,
  getActionViewDefinitionById,
} from '../../viewDefinitions/actionViewDefinitions';
import Match, { MatchContext } from '../../viewDefinitions/match';

type ActionButtonProps = {
  caster: ICharacterState;
  action: IActionState;
  enabled: boolean;
  handleClick: (actionId: string) => void;
};

export default function ActionButton({
  caster,
  action,
  enabled,
  handleClick,
}: ActionButtonProps) {
  const match: Match | undefined = useContext(MatchContext);
  if (match === undefined) {
    throw new Error();
  }

  const [canAfford, setCanAfford] = useState(true);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    const actionUnListen = action.listen(
      'cooldown',
      (value: number, previousValue: number) => {
        setCooldown(value);
      }
    );
    const manaChangedUnlisten = caster.resources.mana.listen(
      'currentValue',
      () => {
        const actionDefinition: IActionDefinition | undefined =
          getActionDefinitionById(action.id);
        if (actionDefinition === undefined) {
          throw new Error(`Action with id ${action.id} has no definition`);
        }

        setCanAfford(canAffordAction(caster, actionDefinition));
      }
    );
    return () => {
      manaChangedUnlisten();
      actionUnListen();
    };
  });

  const actionViewDefinition: ActionViewDefinition | undefined =
    getActionViewDefinitionById(action.id);
  if (actionViewDefinition === undefined) {
    throw new Error(`Action with id ${action.id} has no view definition`);
  }

  const boxShadowString = !enabled
    ? ''
    : `0 0 5px 2px rgba(${canAfford && cooldown === 0 ? '0' : '255'}, ${
        canAfford && cooldown === 0 ? '255' : '0'
      }, 0, 0.5)`;

  const actionDefinition: IActionDefinition | undefined =
    getActionDefinitionById(action.id);
  if (actionDefinition === undefined) {
    throw new Error(`Action with id ${action.id} has no definition`);
  }
  const fillPercentage =
    cooldown > 0 ? `${(cooldown / actionDefinition.cooldown) * 100}%` : '100%';

  return (
    <button
      disabled={!enabled || !canAfford || cooldown > 0}
      className="action_button"
      onClick={() => {
        handleClick(action.id);
      }}
      style={{
        backgroundImage: `url(${actionViewDefinition.image})`,
        boxShadow: boxShadowString,
      }}
    >
      <span>{cooldown === 0 ? '' : cooldown}</span>
      {(!enabled || !canAfford || cooldown > 0) && (
        <div className="overlay" style={{ height: fillPercentage }} />
      )}
    </button>
  );
}
