import FireballIcon from '../../assets/placeholder_fireball.png';
import IceboltIcon from '../../assets/placeholder_iceball.png';

export type ActionDefinition = {
  name: string;
  description: string;
  image: string;
};

export const fireballDefinition: ActionDefinition = {
  name: 'Fireball',
  description: 'Hurl a fireball at your opponent, dealing fire damage',
  image: FireballIcon,
};

export const iceboltDefinition: ActionDefinition = {
  name: 'Ice Bolt',
  description: 'Unleash a blast of ice at your opponent, dealing frost damage',
  image: IceboltIcon,
};

const actionDefinitions: { [id: string]: ActionDefinition } = {
  fireball: fireballDefinition,
  icebolt: iceboltDefinition,
};

export function getActionDefinitionById(
  id: string
): ActionDefinition | undefined {
  return actionDefinitions[id];
}
