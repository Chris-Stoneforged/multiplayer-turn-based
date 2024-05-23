import React from 'react';
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
    <div>
      {characterArray.map((character: ICharacterState) => (
        <li key={character.name}>
          <CharacterDetails character={character}></CharacterDetails>
        </li>
      ))}
    </div>
  );
}
