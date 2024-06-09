import FireballIcon from '../assets/actionIcons/placeholder_fireball.png';
import IceboltIcon from '../assets/actionIcons/placeholder_iceball.png';
import RaiseDead from '../assets/actionIcons/placeholder_raise_dead.png';

export type ActionViewDefinition = {
  name: string;
  description: string;
  image: string;
};

const actionViewDefinitions: { [id: string]: ActionViewDefinition } = {
  fireball: {
    name: 'Fireball',
    description: 'Hurl a fireball at your opponent, dealing fire damage',
    image: FireballIcon,
  },
  icebolt: {
    name: 'Ice Bolt',
    description:
      'Unleash a blast of ice at your opponent, dealing frost damage',
    image: IceboltIcon,
  },
  raiseDead: {
    name: 'Raise Dead',
    description: 'Summon a flesh-hungry zombie to fight by your side',
    image: RaiseDead,
  },
};

export function getActionViewDefinitionById(
  id: string
): ActionViewDefinition | undefined {
  return actionViewDefinitions[id];
}
