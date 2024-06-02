import React, { useContext, useEffect, useState } from 'react';
import './gameOverScreen.css';
import Match, { MatchContext } from '../../game/match';

type GameOverScreenProps = {
  returnToLobby: () => void;
};

type MatchResult = undefined | 'Won' | 'Lost';

export default function GameOverScreen({ returnToLobby }: GameOverScreenProps) {
  const match: Match | undefined = useContext(MatchContext);
  if (match === undefined) {
    throw new Error();
  }

  const [MatchResult, setMatchResult] = useState<MatchResult>(undefined);

  useEffect(() => {
    match.events.on('match_ended', setResult);
    return () => {
      match.events.removeListener('match_ended', setResult);
    };
  });

  const setResult = (winner: boolean) =>
    setMatchResult(winner ? 'Won' : 'Lost');

  if (MatchResult === undefined) {
    return null;
  }

  return (
    <div>
      <div className="darkenator" />
      <div
        className="result"
        style={{ color: `${MatchResult === 'Won' ? 'gold' : 'red'}` }}
      >
        {MatchResult === 'Won' ? 'Victory' : 'Defeat'}
      </div>
      <button className="return_button" onClick={returnToLobby}>
        Back to Lobby
      </button>
    </div>
  );
}
