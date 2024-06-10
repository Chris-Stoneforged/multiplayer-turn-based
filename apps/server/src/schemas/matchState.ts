import { Schema, MapSchema, type } from '@colyseus/schema';
import { CharacterState } from './characterState';
import TurnState from './turnState';
import { PlayerState } from './playerState';
import {
  CharacterId,
  GameConfig,
  IMatchState,
  getCharacterDefinitionById,
} from '@multiplayer-turn-based/common';
import MatchEventBus from '../game/gameEvents';

export class MatchState extends Schema implements IMatchState {
  @type({ map: PlayerState }) players = new MapSchema<PlayerState>();
  @type(TurnState) turnState: TurnState;

  allCharacters: CharacterState[] = [];
  events: MatchEventBus;

  constructor(config: GameConfig) {
    super();

    this.events = new MatchEventBus();
    this.turnState = new TurnState(this.events);

    this.events.addListener('character_died', (character: CharacterState) =>
      this.onCharacterDied(character)
    );
  }

  registerPlayer(id: string) {
    this.players.set(id, new PlayerState(id));
    this.events.emit('player_joined', id);
  }

  spawnCharacter(owner: string, characterId: CharacterId) {
    const characterDefinition = getCharacterDefinitionById(characterId);
    const character = new CharacterState(this, owner, characterDefinition);

    this.players
      .get(owner)
      .characters.set(`${character.instanceId}`, character);
    this.allCharacters.push(character);

    this.events.emit('character_spawned', character);
  }

  onCharacterDied(character: CharacterState) {
    console.log('character died called from matchState');
    this.players.get(character.owner).characters.delete(character.instanceId);

    const index = this.allCharacters.indexOf(character, 0);
    if (index > -1) {
      this.allCharacters.splice(index, 1);
    }
  }

  startMatch() {
    this.events.emit('match_started');
    console.log('Match Started');

    this.turnState.startTurns();
  }
}
