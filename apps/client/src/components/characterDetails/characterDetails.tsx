import React from 'react';
import './characterDetails.css';
import HealthBar from './resources/healthBar';
import { ICharacterState } from '@multiplayer-turn-based/common';
import ResourceBar from './resources/resourceBar';
import {
  CharacterViewDefinition,
  getCharacterViewDefinitionById,
} from '../../viewDefinitions/characterViewDefinitions';

type CharacterDetailsProps = {
  character: ICharacterState;
};

export default function characterDetails({ character }: CharacterDetailsProps) {
  console.log(character.id);
  const viewDefinition: CharacterViewDefinition =
    getCharacterViewDefinitionById(character.id);

  return (
    <div className="details_container">
      <img src={viewDefinition.image} alt="" className="portrait_image" />
      <div>
        {viewDefinition.name}
        <HealthBar health={character.health} />
        <ResourceBar
          resource={character.resources.mana}
          resourceType={'Mana'}
        />
      </div>
    </div>
  );
}
