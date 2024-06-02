import './actionSection.css';
import { IActionState, ICharacterState } from '@multiplayer-turn-based/common';
import React, { useContext, useEffect, useState } from 'react';
import ActionButton from './actionButton';
import Match, { MatchContext } from '../../game/match';

export default function ActionSection() {
  const match: Match | undefined = useContext(MatchContext);
  if (match === undefined) {
    throw new Error();
  }

  const [currentCharacter, setCurrentCharacter] = useState(
    Array.from(match.playerCharacters.keys())[0]
  );
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const unListen = match.turnState.listen(
      'currentCharacterTurn',
      (current: string, previous: string) => {
        const character = match.playerCharacters.get(current);
        setEnabled(character !== undefined);
        if (character === undefined) {
          return;
        }
        setCurrentCharacter(current);
      }
    );
    return () => {
      unListen();
    };
  });

  const onButtonClick = (actionId: string) => {
    match.sendMessage('use_action', {
      actionId: actionId,
      targetData: {
        selectedTargets: [],
      },
    });
  };

  const character: ICharacterState | undefined =
    match.playerCharacters.get(currentCharacter);
  if (character === undefined) {
    throw new Error('Character does not exist');
  }

  const actions: IActionState[] = Array.from(character.actions.values());

  return (
    <div className="action_section">
      <ul className="action_list">
        {actions.map((action: IActionState) => (
          <ActionButton
            key={action.id}
            action={action}
            enabled={enabled}
            handleClick={onButtonClick}
          />
        ))}
      </ul>
    </div>
  );
}
