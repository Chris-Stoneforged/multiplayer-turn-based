import FireballIcon from '../../assets/placeholder_fireball.png';
import IceboltIcon from '../../assets/placeholder_iceball.png';

export type ActionViewDefinition = {
  name: string;
  description: string;
  image: string;
};

export const fireballViewDefinition: ActionViewDefinition = {
  name: 'Fireball',
  description: 'Hurl a fireball at your opponent, dealing fire damage',
  image: FireballIcon,
};

export const iceboltViewDefinition: ActionViewDefinition = {
  name: 'Ice Bolt',
  description: 'Unleash a blast of ice at your opponent, dealing frost damage',
  image: IceboltIcon,
};

const actionViewDefinitions: { [id: string]: ActionViewDefinition } = {
  fireball: fireballViewDefinition,
  icebolt: iceboltViewDefinition,
};

export function getActionViewDefinitionById(
  id: string
): ActionViewDefinition | undefined {
  return actionViewDefinitions[id];
}
