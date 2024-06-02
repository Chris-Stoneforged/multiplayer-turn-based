import React from 'react';
import './actionButton.css';
import { IActionState } from '@multiplayer-turn-based/common';
import {
  ActionDefinition,
  getActionDefinitionById,
} from '../../game/actionDefinitions/actionDefinition';

type ActionButtonProps = {
  action: IActionState;
  enabled: boolean;
  handleClick: (actionId: string) => void;
};

export default function ActionButton({
  action,
  enabled,
  handleClick,
}: ActionButtonProps) {
  const actionDefinition: ActionDefinition | undefined =
    getActionDefinitionById(action.id);
  if (actionDefinition === undefined) {
    throw new Error(`Action with id ${action.id} has no definition`);
  }

  return (
    <button
      disabled={!enabled}
      className="action_button"
      onClick={() => {
        handleClick(action.id);
      }}
      style={{
        backgroundImage: `url(${actionDefinition.image})`,
      }}
    />
  );
}
