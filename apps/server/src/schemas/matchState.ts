import { Schema, MapSchema, type } from '@colyseus/schema';
import EventEmitter from 'events';
import GameEvents from '../game/gameEvents';
import { CharacterConfig } from '../game/config/characterConfig';
import { CharacterState } from './characterState';
import TurnState from './turnState';
import { PlayerState } from './playerState';
import { GameConfig } from '@multiplayer-turn-based/common';

export class MatchState extends Schema {
  @type({ map: PlayerState }) players = new MapSchema<PlayerState>();
  @type(TurnState) turnState: TurnState;

  allCharacters: CharacterState[] = [];
  events: EventEmitter = new EventEmitter();

  constructor(config: GameConfig) {
    super();

    this.turnState = new TurnState(this.events);
  }

  registerPlayer(id: string) {
    this.players.set(id, new PlayerState(id));
    this.events.emit(GameEvents.OnPlayerJoined, id);
  }

  spawnCharacter(owner: string, config: CharacterConfig) {
    const character = new CharacterState(this, owner, config);

    this.players
      .get(owner)
      .characters.set(`${owner}_${config.name}`, character);
    this.allCharacters.push(character);

    this.events.emit(GameEvents.OnCharacterSpawned, character);
  }

  startMatch() {
    this.events.emit(GameEvents.OnMatchStarted);
    console.log('Match Started');

    this.turnState.startTurns();
  }
}
