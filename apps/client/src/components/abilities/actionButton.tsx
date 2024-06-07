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
} from '../../game/actionDefinitions/actionDefinition';
import Match, { MatchContext } from '../../game/match';

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

  useEffect(() => {
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
    };
  });

  const actionViewDefinition: ActionViewDefinition | undefined =
    getActionViewDefinitionById(action.id);
  if (actionViewDefinition === undefined) {
    throw new Error(`Action with id ${action.id} has no view definition`);
  }

  return (
    <button
      disabled={!enabled || !canAfford}
      className="action_button"
      onClick={() => {
        handleClick(action.id);
      }}
      style={{
        backgroundImage: `url(${actionViewDefinition.image})`,
      }}
    />
  );
}
