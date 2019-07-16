import { Action } from 'redux';

import { CollectedItemInterface, ItemInterface } from '../interfaces/item';
import { BoardSlotInterface } from '../interfaces/board';

import {
  GAME_SAVE_ITEMS,
  GameSaveItemsAction,
  GAME_SAVE_BOARD_SLOTS,
  GameSaveBoardSlotsAction,
  GAME_START,
  GAME_STOP,
} from '../actions/game';

import { ITEMS } from '../../constraints/items';

export interface GameReducerInterface {
  isGameRunning: boolean;
  items: ItemInterface[];
  collectedItems: CollectedItemInterface[];
  boardSlots: BoardSlotInterface[];
}

const defaultState: GameReducerInterface = {
  isGameRunning: false,
  items: [{
    icon: ITEMS.FIRE,
    basePoints: 200,
    bonusPoints: 50,
    bonusMultiplier: 2,
  }, {
    icon: ITEMS.FISH,
    basePoints: 150,
    bonusPoints: 100,
    bonusMultiplier: 3,
  }, {
    icon: ITEMS.LEMON,
    basePoints: 100,
    bonusPoints: 0,
    bonusMultiplier: 0,
  }, {
    icon: ITEMS.SKULL,
    basePoints: 50,
    bonusPoints: 0,
    bonusMultiplier: 0,
  }, {
    icon: ITEMS.SPIDER,
    basePoints: 25,
    bonusPoints: 1000,
    bonusMultiplier: 10,
  }, {
    icon: ITEMS.BIOHAZARD,
    basePoints: -250,
    bonusPoints: -50,
    bonusMultiplier: 3,
  }],
  collectedItems: [],
  boardSlots: [],
};

export default (state = defaultState, action: Action): GameReducerInterface => {
  switch (action.type) {
    case GAME_SAVE_ITEMS: {
      return {
        ...state,
        collectedItems: [...(action as GameSaveItemsAction).items],
      };
    }
    case GAME_SAVE_BOARD_SLOTS: {
      return {
        ...state,
        boardSlots: [...(action as GameSaveBoardSlotsAction).boardSlots],
      };
    }
    case GAME_START: {
      return {
        ...state,
        isGameRunning: true,
      };
    }
    case GAME_STOP: {
      return {
        ...state,
        isGameRunning: false,
      };
    }
    default: {
      return state;
    }
  }
};
