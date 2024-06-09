import React from 'react';
import { CharacterId } from '@multiplayer-turn-based/common';
import './characterSelection.css';
import { getCharacterViewDefinitionById } from '../../viewDefinitions/characterViewDefinitions';

type CharacterSelectionProps = {
  characterId: CharacterId;
  selected: boolean;
  handleClick: (id: CharacterId) => void;
};

export default function CharacterSelection({
  characterId,
  selected,
  handleClick,
}: CharacterSelectionProps) {
  const characterView = getCharacterViewDefinitionById(characterId);
  const boxShadowString = !selected ? '' : '0 0 5px 2px rgba(0, 255, 0, 1)';

  return (
    <div>
      <div className="character_select">{characterView.name}</div>
      <button
        className="character_button"
        style={{
          boxShadow: boxShadowString,
          backgroundImage: `url(${characterView.image})`,
        }}
        onClick={() => handleClick(characterId)}
      />
    </div>
  );
}
