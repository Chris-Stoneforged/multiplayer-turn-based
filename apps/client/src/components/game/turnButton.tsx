import React, { useEffect, useState } from 'react';
import './turnButton.css';

export default function TurnButton({ room }: any) {
  const [currentTurn, setCurrentTurn] = useState(
    room.state.turnState.currentPlayerTurn
  );

  useEffect(() => {
    room.state.turnState.listen(
      'currentPlayerTurn',
      (currentValue: any, previousValue: any) =>
        setCurrentTurn((value: any) => currentValue)
    );
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
