import { Room } from '@colyseus/core';
import { MatchState } from '../schemas/matchState';

export class MatchRoom extends Room<MatchState> {
  maxClients = 2;

  onCreate() {
    this.setState(new MatchState());
  }
}
