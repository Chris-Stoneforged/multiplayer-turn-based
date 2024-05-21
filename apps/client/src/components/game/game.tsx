import { Room } from 'colyseus.js';
import './game.css';
import React from 'react';
import Background from './../../assets/game-background.webp';

type GameProps = {
  room: Room | undefined;
};

export default function Game({ room }: GameProps) {
  return (
    <main>
      <div className="match_container">
        <img src={Background} alt="" className="game_background" />
      </div>
    </main>
  );
}
