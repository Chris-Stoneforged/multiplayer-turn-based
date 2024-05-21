import { Client, Room } from '@colyseus/core';
import { MatchState } from '../schemas/matchState';
import gameConfig from '@multiplayer-turn-based/common';

export class MatchRoom extends Room<MatchState> {
  maxClients = gameConfig.numPlayers;
  currentClients = 0;

  onCreate() {
    this.setState(new MatchState(null));
    this.onMessage('end_turn', (client, message) => {
      this.onEndTurn(client, message);
    });
    this.onMessage('use_action', (client, message) => {
      this.onUseAction(client, message);
    });
  }

  onJoin(client: Client, options: any) {
    console.log(`Client ${client.sessionId} joined`);

    this.state.registerPlayer(client.sessionId);
    this.state.spawnCharacter(client.sessionId, options.config);

    this.currentClients++;
    if (this.currentClients == this.maxClients) {
      this.state.startMatch();
    }
  }

  onEndTurn(client: Client, data: any) {
    if (!this.state.turnState.isPlayersTurn(client.sessionId)) {
      return;
    }

    this.state.turnState.endCurrentTurn();
  }

  onUseAction(client: Client, { abilityId, targetData }) {
    if (!this.state.turnState.isPlayersTurn(client.sessionId)) {
      throw new Error('Client cannot take this action, not their turn');
    }

    this.state.characters
      .get(this.state.turnState.currentCharacterTurn)
      .castAction(abilityId, targetData);
  }
}
