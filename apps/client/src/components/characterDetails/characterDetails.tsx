import React from 'react';
import './characterDetails.css';
import { ICharacter } from 'common/src/gameDefinitions';
import Portait from '../../assets/placeholder_portrait.png';
import HealthBar from './healthBar';

type characterDetailsProps = {
  character: ICharacter;
};

export default function characterDetails({ character }: characterDetailsProps) {
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
