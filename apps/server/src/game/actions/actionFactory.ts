import { MatchState } from '../../schemas/matchState';
import ActionState from '../../schemas/actionState';
import Fireball from './fireball';
import Icebolt from './icebolt';

export function createActionFromId(id: string, match: MatchState): ActionState {
  switch (id) {
    case 'fireball':
      return new Fireball(match);
    case 'icebolt':
      return new Icebolt(match);
  }

  return null;
}
