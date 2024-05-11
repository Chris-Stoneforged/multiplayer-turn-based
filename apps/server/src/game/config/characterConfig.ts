export type CharacterType = 'Hero' | 'Minion';

export type CharacterConfig = {
  name: string;
  type: CharacterType;
  maxHealth: number;
  actions: number[];
};
