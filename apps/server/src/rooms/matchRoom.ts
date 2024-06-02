import { Client, Room } from '@colyseus/core';
import { MatchState } from '../schemas/matchState';
import gameConfig from '@multiplayer-turn-based/common';
import { CharacterConfig } from '../game/config/characterConfig';
import EventEmitter from 'events';
import { standardMatchEndEvaluator } from '../game/matchEvaluation/matchEndEvaluator';

export class MatchRoom extends Room<MatchState> {
  maxClients = gameConfig.numPlayers;
  currentClients = 0;

  onCreate() {
    // Match end handling
    const events = new EventEmitter();
    standardMatchEndEvaluator(events, (winner: string) =>
      this.gameEnded(winner)
    );

    this.setState(new MatchState(null, events));
    this.onMessage('end_turn', (client, message) => {
      this.handleEndTurn(client, message);
    });
    this.onMessage('use_action', (client, message) => {
      this.handleCastAction(client, message);
    });
  }

  onJoin(client: Client, options: any) {
    console.log(`Client ${client.sessionId} joined`);

    this.state.registerPlayer(client.sessionId);
    options.config.forEach((config: CharacterConfig) => {
      this.state.spawnCharacter(client.sessionId, config);
    });

    this.currentClients++;
    if (this.currentClients == this.maxClients) {
      this.state.startMatch();
    }
  }

  handleEndTurn(client: Client, data: any) {
    if (!this.state.turnState.isPlayersTurn(client.sessionId)) {
      return;
    }

    this.state.turnState.endCurrentTurn();
  }

  handleCastAction(client: Client, { actionId, targetData }) {
    if (!this.state.turnState.isPlayersTurn(client.sessionId)) {
      throw new Error('Client cannot take this action, not their turn');
    }

    this.state.players
      .get(client.sessionId)
      .characters.get(this.state.turnState.currentCharacterTurn)
      .castAction(actionId, targetData);
  }

  gameEnded(winnerId: string) {
    console.log(winnerId);
    const playerIds = Array.from(this.state.players.keys());
    playerIds.forEach((client) =>
      this.clients.getById(client).send('match_ended', winnerId)
    );
  }
}
