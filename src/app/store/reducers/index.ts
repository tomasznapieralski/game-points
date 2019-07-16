import { combineReducers } from 'redux';

import gameReducer from './game';

const rootReducer = combineReducers({
  game: gameReducer,
});

export type AppStateInterface = ReturnType<typeof rootReducer>;

export default rootReducer;
