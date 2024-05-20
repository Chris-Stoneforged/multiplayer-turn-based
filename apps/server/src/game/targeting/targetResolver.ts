import { MapSchema } from '@colyseus/schema';
import { CharacterState } from '../../schemas/characterState';
import { MatchState } from '../../schemas/matchState';
import { TargetAlliance, TargetClass, TargetConfig } from './targetTypes';

export function resolveTargets(
  game: MatchState,
  caster: CharacterState,
  targetConfig: TargetConfig,
  selectedTargets: string[]
): CharacterState[] {
  const validTargets = getValidTargetsFromConfig(
    caster,
    game.characters,
    targetConfig
  );
  switch (targetConfig.targetType) {
    case 'All':
      return validTargets;
    case 'Random':
      return getRandomTargets(validTargets, targetConfig.targetCount);
    case 'RandomUnique':
      return getRandomUniqueTargets(validTargets, targetConfig.targetCount);
    case 'Selected':
      return validTargets.filter((character) =>
        selectedTargets.includes(character.id)
      );
    case 'Self':
      return [caster];
    default:
      throw new Error('Invalid Target Type');
  }
}

function getValidTargetsFromConfig(
  caster: CharacterState,
  characters: MapSchema<CharacterState>,
  config: TargetConfig
): CharacterState[] {
  const allCharacters = Array.from(characters).map(
    (characterPair) => characterPair[1]
  );
  const validCharacters = allCharacters
    .filter((character) => filterCharacterClass(character, config.targetClass))
    .filter((character) =>
      filterCharacterAlliance(caster, character, config.targetAlliance)
    );
  return validCharacters;
}

function filterCharacterAlliance(
  caster: CharacterState,
  character: CharacterState,
  targetAlliance: TargetAlliance
): boolean {
  switch (targetAlliance) {
    case 'All':
      return true;
    case 'Friendly':
      return caster.owner === character.owner;
    case 'Enemy':
      return caster.owner !== character.owner;
  }
}

function filterCharacterClass(
  character: CharacterState,
  targetClass: TargetClass
): boolean {
  switch (targetClass) {
    case 'All':
      return true;
    default:
      return targetClass == character.class;
  }
}

function getRandomTargets(
  validCharacters: CharacterState[],
  numberOfTargets: number
): CharacterState[] {
  const randomValues: CharacterState[] = [];
  for (let i = 0; i < numberOfTargets; i++) {
    const randomIndex = Math.floor(Math.random() * validCharacters.length);
    randomValues.push(validCharacters[randomIndex]);
  }

  return randomValues;
}

function getRandomUniqueTargets(
  validCharacters: CharacterState[],
  numberOfTargets: number
): CharacterState[] {
  const x = Math.min(numberOfTargets, validCharacters.length);

  // Shuffle the array using Fisher-Yates algorithm
  const shuffledArray = validCharacters.slice(); // Create a copy of the array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  // Select the first x elements
  return shuffledArray.slice(0, x);
}
