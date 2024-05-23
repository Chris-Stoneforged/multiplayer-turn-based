import { IPlayerState } from '@multiplayer-turn-based/common';
import React from 'react';

type PlayerDetailsProps = {
  player: IPlayerState;
};

export default function PlayerDetails({ player }: PlayerDetailsProps) {
  return <div>{player.name}</div>;
}
