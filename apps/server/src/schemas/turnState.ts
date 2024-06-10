import { Schema, type } from '@colyseus/schema';
import { CharacterState } from './characterState';
import { ITurnState } from '@multiplayer-turn-based/common';
import MatchEventBus from '../game/gameEvents';

export default class TurnState extends Schema implements ITurnState {
  @type('string') currentCharacterTurn: string;
  @type('string') currentPlayerTurn: string;

  private charactersByPlayer: Map<string, string[]>;
  private players: string[];
  private playerTurnIndex: number;
  private characterTurnIndex: number;

  private events: MatchEventBus;

  constructor(events: MatchEventBus) {
    super();

    this.events = events;
    this.players = [];
    this.playerTurnIndex = 0;
    this.characterTurnIndex = 0;
    this.charactersByPlayer = new Map<string, string[]>();

    this.events.on('player_joined', (player: string) =>
      this.onPlayerJoined(player)
    );
    this.events.on('character_spawned', (character: CharacterState) =>
      this.onCharacterSpawned(character)
    );
    this.events.on('character_died', (character: CharacterState) => {
      this.onCharacterDied(character);
    });
  }

  onPlayerJoined(player: string) {
    this.players.push(player);
    this.charactersByPlayer.set(player, []);
  }

  onCharacterSpawned(character: CharacterState) {
    const turnCharacters = this.charactersByPlayer.get(character.owner);
    if (turnCharacters) {
      turnCharacters.push(character.instanceId);
    }
  }

  onCharacterDied(character: CharacterState) {
    const turnCharacters = this.charactersByPlayer.get(character.owner);
    if (turnCharacters) {
      const index = turnCharacters.indexOf(character.instanceId, 0);
      if (index > -1) {
        turnCharacters.splice(index, 1);
      }
    }
  }

  startTurns() {
    // Random starting player
    this.playerTurnIndex = Math.floor(Math.random() * this.players.length);
    this.setTurn();
  }

  isPlayersTurn(player: string): boolean {
    return player === this.currentPlayerTurn;
  }

  endCurrentTurn() {
    this.events.emit(
      'turn_ended',
      this.currentPlayerTurn,
      this.currentCharacterTurn
    );

    this.characterTurnIndex++;
    const numCharacters = this.charactersByPlayer.get(
      this.currentPlayerTurn
    ).length;
    if (this.characterTurnIndex >= numCharacters) {
      this.characterTurnIndex = 0;

      this.playerTurnIndex++;
      if (this.playerTurnIndex >= this.players.length) {
        this.playerTurnIndex = 0;
      }
    }

    this.setTurn();
  }

  private setTurn() {
    this.currentPlayerTurn = this.players[this.playerTurnIndex];
    const currentTurnCharacters = this.charactersByPlayer.get(
      this.currentPlayerTurn
    );
    this.currentCharacterTurn = currentTurnCharacters[this.characterTurnIndex];

    this.events.emit(
      'turn_started',
      this.currentPlayerTurn,
      this.currentCharacterTurn
    );
  }
}
