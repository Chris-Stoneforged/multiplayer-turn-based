import './actionSection.css';
import {
  IActionState,
  ICharacterState,
  IMatchState,
} from '@multiplayer-turn-based/common';
import { Room } from 'colyseus.js';
import React, { useEffect, useState } from 'react';
import ActionButton from './actionButton';

type ActionSectionProps = {
  room: Room<IMatchState>;
};

export default function ActionSection({ room }: ActionSectionProps) {
  const [currentCharacter, setCurrentCharacter] = useState(
    Array.from(room.state.players.get(room.sessionId)!.characters.keys())[0]
  );
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const unListen = room.state.turnState.listen(
      'currentCharacterTurn',
      (current: string, previous: string) => {
        const character = room.state.players
          .get(room.sessionId)
          ?.characters.get(current);
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
    room.send('use_action', {
      actionId: actionId,
      targetData: {
        selectedTargets: [],
      },
    });
  };

  const character: ICharacterState | undefined = room.state.players
    .get(room.sessionId)
    ?.characters.get(currentCharacter);
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
