import { createContext, useContext } from 'react';

export const TurnContext = createContext({
  currentPlayerTurn: '',
  currentCharacterTurn: '',
});
