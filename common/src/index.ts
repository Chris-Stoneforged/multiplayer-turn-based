import { GameConfig } from './gameConfig';

export * from './stateDefinitions';
export * from './gameConfig';
export * from './gameTypes';
export * from './utils';
export * from './actionDefinition/actionRegistry';

const gameConfig: GameConfig = {
  numPlayers: 2,
};

export default gameConfig;
