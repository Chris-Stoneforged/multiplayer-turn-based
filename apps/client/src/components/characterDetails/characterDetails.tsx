import React from 'react';
import './characterDetails.css';
import Portait from '../../assets/placeholder_portrait.png';
import HealthBar from './resources/healthBar';
import { ICharacterState } from '@multiplayer-turn-based/common';
import ResourceBar from './resources/resourceBar';

type CharacterDetailsProps = {
  character: ICharacterState;
};

export default function characterDetails({ character }: CharacterDetailsProps) {
  return (
    <div className="details_container">
      <img src={Portait} alt="" className="portrait_image" />
      <div>
        {character.name}
        <HealthBar health={character.health} />
        <ResourceBar
          resource={character.resources.mana}
          resourceType={'Mana'}
        />
      </div>
    </div>
  );
}
