export interface ICharacter {
  name: string;
  health: IResource;
}

export interface IPlayer {
  name: string;
  characters: Map<string, ICharacter>;
}

export interface IResource {
  maxValue: number;
  currentValue: number;
}
