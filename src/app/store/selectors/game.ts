import { AppStateInterface } from '../reducers/index';

export const getItems = (state: AppStateInterface) => state.game.items;

export const getCollectedItems = (state: AppStateInterface) => state.game.collectedItems;

export const getBoardSlots = (state: AppStateInterface) => state.game.boardSlots;

export const getIsGameRunning = (state: AppStateInterface) => state.game.isGameRunning;
