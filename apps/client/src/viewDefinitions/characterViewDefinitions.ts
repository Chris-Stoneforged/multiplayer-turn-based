import { CharacterId } from '@multiplayer-turn-based/common';
import NecromancerIcon from '../assets/characterPortraits/placeholder_portrait_necromancer.png';
import PyromancerIcon from '../assets/characterPortraits/placeholder_portrait_pyromancer.png';
import ZombieIcon from '../assets/characterPortraits/placeholder_portrait_zombie.png';

export type CharacterViewDefinition = {
  name: string;
  image: string;
};

const characterViewDefinitions: { [id: string]: CharacterViewDefinition } = {
  necromancer: {
    name: 'Necromancer',
    image: NecromancerIcon,
  },
  pyromancer: {
    name: 'Pyromancer',
    image: PyromancerIcon,
  },
  zombie: {
    name: 'Zombie',
    image: ZombieIcon,
  },
};

export function getCharacterViewDefinitionById(
  id: CharacterId
): CharacterViewDefinition {
  return characterViewDefinitions[id];
}
