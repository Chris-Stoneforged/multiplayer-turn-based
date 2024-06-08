import React, { useContext, useEffect, useState } from 'react';
import './turnButton.css';
import Match, { MatchContext } from '../../viewDefinitions/match';

export default function TurnButton() {
  const match: Match | undefined = useContext(MatchContext);
  if (match === undefined) {
    throw new Error();
  }
  const [currentTurn, setCurrentTurn] = useState(
    match.turnState.currentPlayerTurn
  );

  useEffect(() => {
    const unListen = match.turnState.listen(
      'currentPlayerTurn',
      (currentValue: any, previousValue: any) => {
        setCurrentTurn(currentValue);
      }
    );
    return () => {
      unListen();
    };
  });

  const onTurnButtonClicked = () => {
    match.sendMessage('end_turn');
  };

  return (
    <button
      className="end_turn_button"
      onClick={onTurnButtonClicked}
      disabled={currentTurn !== match.playerId}
    >
      {currentTurn === match.playerId ? 'End Turn' : 'Enemy Turn'}
    </button>
  );
}
