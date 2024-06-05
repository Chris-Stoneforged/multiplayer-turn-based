import { ICharacterState } from './stateDefinitions';

export type TargetType =
  | 'Selected'
  | 'Random'
  | 'RandomUnique'
  | 'All'
  | 'Self';

export type CharacterType = 'Hero' | 'Minion';
export type TargetCharacterType = CharacterType | 'All';
export type TargetAlliance = 'Friendly' | 'Enemy' | 'All';

export type TargetConfig = {
  targetType: TargetType;
  targetClass: TargetCharacterType;
  targetAlliance: TargetAlliance;
  targetCount: number;
};

export type TargetData = {
  selectedTargets: string[];
};

export type CharacterConfig = {
  name: string;
  type: CharacterType;
  maxHealth: number;
  maxMana: number;
  actions: string[];
};

export type ResourceValues = {
  manaValue?: number;
};

export interface IActionDefinition {
  target: TargetConfig;
  cost: ResourceValues;
  cast: (caster: ICharacterState, targets: ICharacterState[]) => void;
}
