export type TargetType =
  | 'Selected'
  | 'Random'
  | 'RandomUnique'
  | 'All'
  | 'Self';

export type TargetClass = 'Hero' | 'Minion' | 'All';

export type TargetAlliance = 'Friendly' | 'Enemy' | 'All';

export type TargetConfig = {
  targetType: TargetType;
  targetClass: TargetClass;
  targetAlliance: TargetAlliance;
  targetCount: number;
};

export type TargetData = {
  selectedTargets: string[];
};

export type CharacterType = 'Hero' | 'Minion';

export type CharacterConfig = {
  name: string;
  type: CharacterType;
  maxHealth: number;
  actions: string[];
};

export default interface IActionDefintion {
  target: TargetConfig;
  // TODO:
}
