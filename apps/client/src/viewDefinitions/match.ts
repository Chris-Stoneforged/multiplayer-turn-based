import {
  ICharacterState,
  IMatchState,
  IPlayerState,
  ITurnState,
} from '@multiplayer-turn-based/common';
import { Room } from 'colyseus.js';
import EventEmitter from 'events';
import { createContext } from 'react';

export const MatchContext = createContext<Match | undefined>(undefined);

export default class Match {
  room: Room<IMatchState>;
  player: IPlayerState;
  opponent: IPlayerState;
  playerCharacters: Map<string, ICharacterState>;
  turnState: ITurnState;
  playerId: string;
  events: EventEmitter;

  public static Create(room: Room<IMatchState>): Match {
    const game = new Match(room);
    return game;
  }

  constructor(room: Room<IMatchState>) {
    this.room = room;
    let player: IPlayerState | undefined;
    let opponent: IPlayerState | undefined;

    room.state.players.forEach((value: IPlayerState, key: string) => {
      if (key === room.sessionId) {
        player = value;
      } else {
        opponent = value;
      }
    });

    if (player === undefined) {
      throw new Error('Player is null');
    }

    if (opponent === undefined) {
      throw new Error('Opponent is null');
    }

    this.playerId = room.sessionId;
    this.player = player;
    this.opponent = opponent;
    this.playerCharacters = player.characters;
    this.turnState = room.state.turnState;
    this.events = new EventEmitter();

    room.onMessage('match_ended', (winner) => {
      console.log(winner);
      this.events.emit('match_ended', winner === this.playerId);
    });
  }

  sendMessage(message: string, data?: any) {
    this.room.send(message, data);
  }
}
