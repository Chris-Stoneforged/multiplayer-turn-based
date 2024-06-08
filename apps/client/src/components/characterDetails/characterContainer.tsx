import React from 'react';
import './characterContainer.css';
import CharacterDetails from './characterDetails';
import { ICharacterState } from '@multiplayer-turn-based/common';

type CharacterContainerProps = {
  characters: Map<string, ICharacterState>;
};

export default function characterContainer({
  characters,
}: CharacterContainerProps) {
  const characterArray = Array.from(characters.values());

  return (
    <ul className="vertical_list">
      {characterArray.map((character: ICharacterState) => (
        <CharacterDetails
          key={character.instanceId}
          character={character}
        ></CharacterDetails>
      ))}
    </ul>
  );
}
