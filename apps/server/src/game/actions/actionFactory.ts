import { MatchState } from '../../schemas/matchState';
import Action from './action';
import Fireball from './fireball';

export function createActionFromId(id: number, match: MatchState): Action {
  switch (id) {
    case 0:
      return new Fireball(match);
  }

  return null;
}
