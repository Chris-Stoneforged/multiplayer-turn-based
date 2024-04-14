import { Client, Room } from '@colyseus/core';
import { MatchState } from '../schemas/matchState';
import { PlayerState } from '../schemas/playerState';

export class MatchRoom extends Room<MatchState> {
  maxClients = 2;

  onCreate() {
    this.setState(new MatchState());
    this.onMessage('end_turn', (client, message) => {
      this.onEndTurn(client, message);
    });
  }

  onJoin(client: Client, options: any) {
    console.log(`Client ${client.sessionId} joined`);
    this.state.players.push(client.sessionId);

    if (this.state.players.length === 2) {
      //this.beginMatch();
      this.state.currentTurn =
        Math.random() > 0.5 ? this.state.players[0] : this.state.players[1];
      console.log(`Current turn: ${this.state.currentTurn}`);
    }
  }

  beginMatch() {
    // Flip a coin to decide who goes first
    //this.state.currentTurn = Math.random() > 0.5 ? this.state.players[0] : this.state.players[1];
  }

  onEndTurn(client: Client, data: any) {
    if (client.sessionId !== this.state.currentTurn) {
      return;
    }

    // Flip turn
    this.state.currentTurn =
      this.state.currentTurn === this.state.players[0]
        ? this.state.players[1]
        : this.state.players[0];

    console.log(`Current turn: ${this.state.currentTurn}`);
  }
}
