const GameEvents = {
  OnPlayerJoined: 'player_joined',
  OnCharacterSpawned: 'character_spawned',
  OnMatchStarted: 'match_started',
  OnTurnEnded: 'turn_ended',
  OnTurnStarted: 'turn_started',
  OnCharacterDied: 'character_died',
} as const;

export default GameEvents;
