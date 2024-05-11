const GameEvents = {
  OnPlayerJoined: 'player_joined',
  OnCharacterSpawned: 'character_spawned',
  OnMatchStarted: 'match_started',
  OnTurnEnded: 'turn_ended',
  OnTurnStarted: 'turn_started',
} as const;

export default GameEvents;
