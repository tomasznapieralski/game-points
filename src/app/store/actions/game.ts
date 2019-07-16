import { Action } from 'redux';

import { CollectedItemInterface } from '../interfaces/item';
import { BoardSlotInterface } from '../interfaces/board';

const prefix = '[GAME]';

export const GAME_INIT = `${prefix} INIT`;

export const gameInit = (): Action => ({
  type: GAME_INIT,
});

export const GAME_SAVE_ITEMS = `${prefix} SAVE_ITEMS`;

export interface GameSaveItemsAction {
  type: string;
  items: CollectedItemInterface[];
}

export const gameSaveItems = (items: CollectedItemInterface[]): GameSaveItemsAction => ({
  type: GAME_SAVE_ITEMS,
  items,
});

export const GAME_SAVE_BOARD_SLOTS = `${prefix} SAVE_BOARD_SLOTS`;

export interface GameSaveBoardSlotsAction {
  type: string;
  boardSlots: BoardSlotInterface[];
}

export const gameSaveBoardSlots = (boardSlots: BoardSlotInterface[]): GameSaveBoardSlotsAction => ({
  type: GAME_SAVE_BOARD_SLOTS,
  boardSlots,
});

export const GAME_START = `${prefix} START`;
export const GAME_STOP = `${prefix} STOP`;

export const gameStart = (): Action => ({
  type: GAME_START,
});

export const gameStop = (): Action => ({
  type: GAME_STOP,
});

export const GAME_SCORE_ITEM = `${prefix} SCORE_ITEM`;

export interface GameScoreItemAction {
  type: string;
  id: number;
}

export const gameScoreItem = (id: number): GameScoreItemAction => ({
  type: GAME_SCORE_ITEM,
  id,
});

export const GAME_SHOW_ITEM = `${prefix} SHOW_ITEM`;

export interface GameShowItemAction {
  type: string;
  id: number;
}

export const gameShowItem = (id: number): GameShowItemAction => ({
  type: GAME_SHOW_ITEM,
  id,
});

export const GAME_HIDE_ITEM = `${prefix} HIDE_ITEM`;

export interface GameHideItemAction {
  type: string;
  id: number;
}

export const gameHideItem = (id: number): GameHideItemAction => ({
  type: GAME_HIDE_ITEM,
  id,
});

export const GAME_REMOVE_ITEM = `${prefix} REMOVE_ITEM`;

export interface GameRemoveItemAction {
  type: string;
  id: number;
}

export const gameRemoveItem = (id: number): GameRemoveItemAction => ({
  type: GAME_REMOVE_ITEM,
  id,
});
