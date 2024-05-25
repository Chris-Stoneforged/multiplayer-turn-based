import { IPlayerState } from '@multiplayer-turn-based/common';
import './playerDetails.css';
import React from 'react';

type PlayerDetailsProps = {
  player: IPlayerState;
};

export default function PlayerDetails({ player }: PlayerDetailsProps) {
  return <div className="player_name">{player.name}</div>;
}
