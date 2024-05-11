import { Schema, MapSchema, type } from '@colyseus/schema';
import { EventEmitter } from 'stream';
import GameEvents from './gameEvents';
import { CharacterState } from '../schemas/characterState';

export default class TurnState extends Schema {
  @type('string') currentCharacterTurn: string;
  @type('string') currentPlayerTurn: string;

  private charactersByPlayer: Map<string, string[]>;
  private players: string[];
  private playerTurnIndex: number;
  private characterTurnIndex: number;

  private events: EventEmitter;

  constructor(events: EventEmitter) {
    super();

    this.events = events;
    this.players = [];
    this.playerTurnIndex = 0;
    this.characterTurnIndex = 0;
    this.charactersByPlayer = new Map<string, string[]>();

    this.events.on(GameEvents.OnPlayerJoined, (player: string) =>
      this.onPlayerJoined(player)
    );
    this.events.on(GameEvents.OnCharacterSpawned, (character: CharacterState) =>
      this.onCharacterSpawned(character)
    );
  }

  onPlayerJoined(player: string) {
    this.players.push(player);
    this.charactersByPlayer.set(player, []);
  }

  onCharacterSpawned(character: CharacterState) {
    const turnCharacters = this.charactersByPlayer.get(character.owner);
    if (turnCharacters) {
      console.log('added');
      turnCharacters.push(character.id);
    }
  }

  startTurns() {
    this.setTurn();
    this.events.emit(GameEvents.OnTurnStarted, this.currentCharacterTurn);
  }

  isPlayersTurn(player: string): boolean {
    return player === this.currentPlayerTurn;
  }

  endCurrentTurn() {
    this.events.emit(GameEvents.OnTurnEnded, this.currentCharacterTurn);

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
    this.events.emit(GameEvents.OnTurnStarted, this.currentCharacterTurn);
  }

  private setTurn() {
    console.log(this.playerTurnIndex);
    console.log(this.players);
    this.currentPlayerTurn = this.players[this.playerTurnIndex];
    console.log(this.currentPlayerTurn);
    console.log(this.charactersByPlayer);
    const currentTurnCharacters = this.charactersByPlayer.get(
      this.currentPlayerTurn
    );
    console.log(currentTurnCharacters);
    console.log(this.characterTurnIndex);
    this.currentCharacterTurn = currentTurnCharacters[this.characterTurnIndex];
  }
}
