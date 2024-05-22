import React from 'react';
import ICharacter from 'common/src/definitions/character';
import CharacterDetails from './characterDetails';

type CharacterContainerProps = {
  characters: Map<string, ICharacter>;
};

export default function characterContainer({
  characters,
}: CharacterContainerProps) {
  const characterArray = Array.from(characters.values());

  return (
    <div>
      {characterArray.map((character) => (
        <li>
          <CharacterDetails character={character}></CharacterDetails>
        </li>
      ))}
    </div>
  );
}
