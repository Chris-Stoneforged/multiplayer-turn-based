import { IPlayer } from '@multiplayer-turn-based/common';
import React from 'react';

type PlayerDetailsProps = {
  player: IPlayer;
};

export default function PlayerDetails({ player }: PlayerDetailsProps) {
  return <div>{player.name}</div>;
}
