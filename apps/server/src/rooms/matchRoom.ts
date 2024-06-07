import { Client, Room } from '@colyseus/core';
import { MatchState } from '../schemas/matchState';
import gameConfig, { JoinOptions } from '@multiplayer-turn-based/common';
import { standardMatchEndEvaluator } from '../game/matchEvaluation/matchEndEvaluator';
import { CharacterConfig } from '@multiplayer-turn-based/common';

export class MatchRoom extends Room<MatchState> {
  maxClients = gameConfig.numPlayers;
  currentClients = 0;

  onCreate() {
    this.setState(new MatchState(null));
    this.onMessage('end_turn', (client, message) => {
      this.handleEndTurn(client, message);
    });
    this.onMessage('use_action', (client, message) => {
      this.handleCastAction(client, message);
    });

    standardMatchEndEvaluator(this, (winner: string) => this.gameEnded(winner));
  }

  onJoin(client: Client, options: JoinOptions) {
    console.log(`Client ${client.sessionId} joined`);

    this.state.registerPlayer(client.sessionId);
    options.characters.forEach((config: CharacterConfig) => {
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
    const playerIds = Array.from(this.state.players.keys());
    playerIds.forEach((client) =>
      this.clients.getById(client).send('match_ended', winnerId)
    );
  }
}
