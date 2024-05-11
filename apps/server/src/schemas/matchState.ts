import { Schema, MapSchema, type } from '@colyseus/schema';
import EventEmitter from 'events';
import { GameConfig } from '../game/config/gameConfig';
import GameEvents from '../game/gameEvents';
import { CharacterConfig } from '../game/config/characterConfig';
import { CharacterState } from './characterState';
import TurnState from '../game/turnState';

export class MatchState extends Schema {
  @type({ map: CharacterState }) characters = new MapSchema<CharacterState>();
  @type(TurnState) turnState: TurnState;

  events: EventEmitter = new EventEmitter();

  constructor(config: GameConfig) {
    super();

    this.turnState = new TurnState(this.events);
  }

  registerPlayer(id: string) {
    this.events.emit(GameEvents.OnPlayerJoined, id);
  }

  spawnCharacter(owner: string, config: CharacterConfig) {
    const character = new CharacterState(this, owner, config);
    this.characters.set(`${owner}_${config.name}`, character);
    this.events.emit(GameEvents.OnCharacterSpawned, character);
  }

  startMatch() {
    this.events.emit(GameEvents.OnMatchStarted);
    console.log('Match Started');

    this.turnState.startTurns();
  }
}
