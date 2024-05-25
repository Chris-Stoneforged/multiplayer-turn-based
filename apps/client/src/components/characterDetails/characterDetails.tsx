import React from 'react';
import './characterDetails.css';
import Portait from '../../assets/placeholder_portrait.png';
import HealthBar from './healthBar';
import { ICharacterState } from '@multiplayer-turn-based/common';

type CharacterDetailsProps = {
  character: ICharacterState;
  alighnLeft: boolean;
};

export default function characterDetails({
  character,
  alighnLeft: alightLeft,
}: CharacterDetailsProps) {
  return (
    <div className="details_container">
      <img src={Portait} alt="" className="portrait_image" />
      <div>
        {character.name}
        <HealthBar health={character.health} alighnLeft={alightLeft} />
      </div>
    </div>
  );
}
