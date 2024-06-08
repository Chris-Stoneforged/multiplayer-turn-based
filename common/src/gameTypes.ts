import { ActionId } from './actionDefinition/actionRegistry';
import { CharacterId } from './characters';

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

export type JoinOptions = {
  characters: ICharacterDefinition[];
};

export interface ICharacterDefinition {
  id: CharacterId;
  type: CharacterType;
  maxHealth: number;
  maxMana: number;
  actions: ActionId[];
}

export type ResourceValues = {
  manaValue?: number;
};

export interface IActionDefinition {
  target: TargetConfig;
  cost: ResourceValues;
  cooldown: number;
}
