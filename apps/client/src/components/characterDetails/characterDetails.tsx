import React from 'react';
import './characterDetails.css';
import Portait from '../../assets/placeholder_portrait.png';
import HealthBar from './healthBar';
import { ICharacterState } from '@multiplayer-turn-based/common';

type CharacterDetailsProps = {
  character: ICharacterState;
};

export default function characterDetails({ character }: CharacterDetailsProps) {
  return (
    <div>
      <div>
        {character.name}
        <img src={Portait} alt="" className="portrait_image" />
      </div>
      <HealthBar health={character.health} />
    </div>
  );
}
