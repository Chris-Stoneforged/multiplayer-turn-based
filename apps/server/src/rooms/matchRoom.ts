import { Client, Room } from '@colyseus/core';
import { MatchState } from '../schemas/matchState';
import { CharacterState } from '../schemas/characterState';
import gameConfig from '../game/config/gameConfig';

export class MatchRoom extends Room<MatchState> {
  maxClients = gameConfig.numPlayers;
  playerIds: string[];

  onCreate() {
    this.setState(new MatchState(gameConfig));
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

    // Need all players to join for the match to start
    if (this.state.players.length === this.maxClients) {
      this.state.startMatch();
    }
  }

  onEndTurn(client: Client, data: any) {
    if (client.sessionId !== this.state.currentTurn) {
      return;
    }

    this.state.nextCharacterTurn();
  }

  onUseAction(client: Client, { abilityId, target }) {
    if (client.sessionId !== this.state.currentTurn) {
      return;
    }

    // Use action
  }
}
