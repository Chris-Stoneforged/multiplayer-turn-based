import { Schema, MapSchema, type } from '@colyseus/schema';
import EventEmitter from 'events';
import { GameConfig } from '../game/config/gameConfig';
import GameEvents from '../game/gameEvents';
import { CharacterConfig } from '../game/config/characterConfig';
import { CharacterState } from './characterState';

export class MatchState extends Schema {
  @type('string') currentTurn: string;
  @type({ map: CharacterState }) characters = new MapSchema<CharacterState>();

  events: EventEmitter = new EventEmitter();
  players: string[] = [];
  currentTurnCharacters: string[];
  playerTurnIndex: number;
  characterTurnIndex: number;

  constructor(config: GameConfig) {
    super();
  }

  registerPlayer(id: string) {
    this.players.push(id);
  }

  spawnCharacter(owner: string, config: CharacterConfig) {
    const character = new CharacterState(this, owner, config);
    this.characters.set(`${owner}_${config.name}`, character);
  }

  startMatch() {
    this.events.emit(GameEvents.OnMatchStarted);
    console.log('Match Started');

    // TODO: Random player starts
    this.playerTurnIndex = 0;
    this.characterTurnIndex = 0;
    this.setPlayerTurn();
  }

  nextCharacterTurn() {
    this.events.emit(GameEvents.OnTurnEnded, this.currentTurn);

    this.characterTurnIndex++;
    if (this.characterTurnIndex >= this.currentTurnCharacters.length) {
      this.characterTurnIndex = 0;

      this.nextPlayerTurn();
    }

    console.log(
      `player turn: ${this.currentTurn}, character turn: ${this.characterTurnIndex}`
    );

    this.events.emit(GameEvents.OnTurnStarted, this.currentTurn);
  }

  nextPlayerTurn() {
    this.playerTurnIndex++;
    if (this.playerTurnIndex >= this.players.length) {
      this.playerTurnIndex = 0;
    }

    this.setPlayerTurn();
  }

  setPlayerTurn() {
    this.currentTurn = this.players[this.playerTurnIndex];
    this.currentTurnCharacters = [];

    this.characters.forEach((value, key) => {
      if (value.owner == this.currentTurn) {
        this.currentTurnCharacters.push(key);
      }
    });
  }
}
