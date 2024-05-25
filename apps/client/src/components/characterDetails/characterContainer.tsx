import React from 'react';
import './characterContainer.css';
import CharacterDetails from './characterDetails';
import { ICharacterState } from '@multiplayer-turn-based/common';

type CharacterContainerProps = {
  characters: Map<string, ICharacterState>;
  alightLeft: boolean;
};

export default function characterContainer({
  characters,
  alightLeft,
}: CharacterContainerProps) {
  const characterArray = Array.from(characters.values());

  return (
    <ul className="vertical_list">
      {characterArray.map((character: ICharacterState) => (
        <CharacterDetails
          key={character.name}
          character={character}
          alighnLeft={alightLeft}
        ></CharacterDetails>
      ))}
    </ul>
  );
}
