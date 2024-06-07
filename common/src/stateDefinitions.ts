import { NonFunctionPropNames } from '@colyseus/schema/src/types/HelperTypes';

interface ISchema {
  /// Replicates listen and onChange methods from Schema
  onChange(callback: () => void): () => void;
  listen<K extends NonFunctionPropNames<this>>(
    prop: K,
    callback: (value: this[K], previousValue: this[K]) => void,
    immediate?: boolean
  ): () => boolean;
}

export interface ICharacterState extends ISchema {
  name: string;
  health: IResourceState;
  actions: Map<string, IActionState>;
  resources: IResourcesState;
}

export interface IPlayerState {
  name: string;
  characters: Map<string, ICharacterState>;
}

export interface IResourcesState extends ISchema {
  mana: IResourceState;
}

export interface IResourceState extends ISchema {
  maxValue: number;
  currentValue: number;
}

export interface IMatchState extends ISchema {
  players: Map<string, IPlayerState>;
  turnState: ITurnState;
}

export interface ITurnState extends ISchema {
  currentPlayerTurn: string;
  currentCharacterTurn: string;
}

export interface IActionState extends ISchema {
  id: string;
  cooldown: number;
}
