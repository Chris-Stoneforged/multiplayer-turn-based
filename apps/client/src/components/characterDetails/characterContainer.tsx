import React, { useEffect, useState } from 'react';
import './characterContainer.css';
import CharacterDetails from './characterDetails';
import { ICharacterState, IPlayerState } from '@multiplayer-turn-based/common';

type CharacterContainerProps = {
  player: IPlayerState;
};

export default function CharacterContainer({
  player,
}: CharacterContainerProps) {
  const [characterList, setCharacterList] = useState<ICharacterState[]>(
    Array.from(player.characters.values())
  );

  useEffect(() => {
    player.characters.onAdd((item: ICharacterState, key: string) => {
      setCharacterList([...characterList, item]);
    }, false);
    player.characters.onRemove((item: ICharacterState, key: string) => {
      console.log(`player removed - ${item.instanceId}`);
      setCharacterList(
        characterList.filter((a) => a.instanceId !== item.instanceId)
      );
    });
  });

  return (
    <ul className="vertical_list">
      {characterList.map((character: ICharacterState) => (
        <CharacterDetails
          key={character.instanceId}
          character={character}
        ></CharacterDetails>
      ))}
    </ul>
  );
}
