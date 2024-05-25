import React, { useEffect, useState } from 'react';
import './turnButton.css';
import { IMatchState } from '@multiplayer-turn-based/common';
import { Room } from 'colyseus.js';

type TurnButtonProps = {
  room: Room<IMatchState>;
};

export default function TurnButton({ room }: TurnButtonProps) {
  const [currentTurn, setCurrentTurn] = useState(
    room.state.turnState.currentPlayerTurn
  );

  useEffect(() => {
    const unListen = room.state.turnState.listen(
      'currentPlayerTurn',
      (currentValue: any, previousValue: any) => {
        console.log('turn changed');
        setCurrentTurn(currentValue);
      }
    );
    return () => {
      unListen();
    };
  });

  const onTurnButtonClicked = () => {
    room.send('end_turn');
  };

  return (
    <button
      className="end_turn_button"
      onClick={onTurnButtonClicked}
      disabled={currentTurn !== room.sessionId}
    >
      {currentTurn === room.sessionId ? 'End Turn' : 'Enemy Turn'}
    </button>
  );
}
