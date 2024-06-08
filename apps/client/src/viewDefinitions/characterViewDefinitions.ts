import { CharacterId } from '@multiplayer-turn-based/common';
import BobIcon from '../assets/placeholder_portrait_1.png';
import JimIcon from '../assets/placeholder_portrait_1.png';

export type CharacterViewDefinition = {
  name: string;
  image: string;
};

const characterViewDefinitions: { [id: string]: CharacterViewDefinition } = {
  Bob: {
    name: 'Bob',
    image: BobIcon,
  },
  Jim: {
    name: 'Jim',
    image: JimIcon,
  },
};

export function getCharacterViewDefinitionById(
  id: CharacterId
): CharacterViewDefinition {
  return characterViewDefinitions[id];
}
