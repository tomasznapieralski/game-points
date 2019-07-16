import { takeEvery, select, put, take, race, call, delay } from 'redux-saga/effects';

import {
  GAME_INIT,
  GAME_START,
  GAME_STOP,
  gameSaveItems,
  gameSaveBoardSlots,
  GAME_SCORE_ITEM,
  GameScoreItemAction,
  GAME_SHOW_ITEM,
  GameShowItemAction,
  GAME_REMOVE_ITEM,
  GameRemoveItemAction,
  gameRemoveItem,
  GAME_HIDE_ITEM,
  GameHideItemAction,
  gameHideItem,
} from '../actions/game';

import { getItems, getBoardSlots, getCollectedItems } from '../selectors/game';

import { ItemInterface, CollectedItemInterface } from '../interfaces/item';
import { BoardSlotInterface } from '../interfaces/board';

import { BOARD_DIMENSIONS } from '../../constraints/board';

import { getRandomInt } from '../../utils/random';

function* setupItems() {
  yield takeEvery(GAME_INIT, function* () {
    const items: ItemInterface[] = yield select(getItems);
    const collectedItems = items.map((item) => {
      return {
        item,
        quantity: 0,
      } as CollectedItemInterface;
    });

    yield put(gameSaveItems(collectedItems));
  });
}

function* setupBoard() {
  yield takeEvery(GAME_INIT, function* () {
    const boardSlots: BoardSlotInterface[] = [];

    for (let row = 1; row <= BOARD_DIMENSIONS.ROWS; row++) {
      for (let col = 1; col <= BOARD_DIMENSIONS.COLS; col++) {
        boardSlots.push({
          row,
          col,
          id: Number(`${row}${col}`),
          isHidden: true,
          item: null,
        } as BoardSlotInterface);
      }
    }

    yield put(gameSaveBoardSlots(boardSlots));
  });
}

function* showItem() {
  yield takeEvery(GAME_SHOW_ITEM, function* (action: GameShowItemAction) {
    const boardSlots: BoardSlotInterface[] = yield select(getBoardSlots);
    const boardSlotIndex = boardSlots.findIndex((boardSlot) => boardSlot.id === action.id);
    const newBoardSlots = [...boardSlots];

    newBoardSlots[boardSlotIndex] = {
      ...newBoardSlots[boardSlotIndex],
      isHidden: false,
    };

    yield put(gameSaveBoardSlots(newBoardSlots));
  });
}

function* hideItem() {
  yield takeEvery(GAME_HIDE_ITEM, function* (action: GameHideItemAction) {
    const boardSlots: BoardSlotInterface[] = yield select(getBoardSlots);
    const boardSlotIndex = boardSlots.findIndex((boardSlot) => boardSlot.id === action.id);
    const newBoardSlots = [...boardSlots];

    newBoardSlots[boardSlotIndex] = {
      ...newBoardSlots[boardSlotIndex],
      isHidden: true,
    };

    yield put(gameSaveBoardSlots(newBoardSlots));
    yield put(gameRemoveItem(action.id));
  });
}

function* scoreItem() {
  yield takeEvery(GAME_SCORE_ITEM, function* (action: GameScoreItemAction) {
    const boardSlots: BoardSlotInterface[] = yield select(getBoardSlots);
    const collectedItems: CollectedItemInterface[] = yield select(getCollectedItems);
    const boardSlotIndex = boardSlots.findIndex((boardSlot) => boardSlot.id === action.id);
    const newBoardSlots = [...boardSlots];
    const boardSlotItem = newBoardSlots[boardSlotIndex].item;
    const collectedItemIndex = collectedItems.findIndex(
      (collectedItem) => collectedItem.item.icon === (boardSlotItem && boardSlotItem.icon)
    );
    const newCollectedItems = [...collectedItems];

    newBoardSlots[boardSlotIndex] = {
      ...newBoardSlots[boardSlotIndex],
      isHidden: true,
    };

    newCollectedItems[collectedItemIndex] = {
      ...newCollectedItems[collectedItemIndex],
      quantity: newCollectedItems[collectedItemIndex].quantity + 1,
    };

    yield put(gameSaveBoardSlots(newBoardSlots));
    yield put(gameSaveItems(newCollectedItems));
    yield put(gameRemoveItem(action.id));
  });
}

function* removeItem() {
  yield takeEvery(GAME_REMOVE_ITEM, function* (action: GameRemoveItemAction) {
    yield delay(300);

    const boardSlots: BoardSlotInterface[] = yield select(getBoardSlots);
    const boardSlotIndex = boardSlots.findIndex((boardSlot) => boardSlot.id === action.id);
    const newBoardSlots = [...boardSlots];

    newBoardSlots[boardSlotIndex] = {
      ...newBoardSlots[boardSlotIndex],
      item: null,
    };

    yield put(gameSaveBoardSlots(newBoardSlots));
  });
}

function* spawnItems() {
  while (true) {
    yield take(GAME_START);
    yield race({
      task: call(function* () {
        while (true) {
          const items: ItemInterface[] = yield select(getItems);
          const boardSlots: BoardSlotInterface[] = yield select(getBoardSlots);
          const availableBoardSlots = boardSlots.filter((boardSlot) => boardSlot.item === null);

          if (availableBoardSlots.length > 0) {
            const newBoardSlots = [...boardSlots];
            const randomSlotIndex = getRandomInt(0, availableBoardSlots.length - 1);
            const randomSlot = availableBoardSlots[randomSlotIndex];
            const newBoardSlotIndex = newBoardSlots.findIndex((boardSlot) =>
              boardSlot.id === randomSlot.id
            );
            const randomItem = getRandomInt(0, items.length - 1);

            newBoardSlots[newBoardSlotIndex] = {
              ...newBoardSlots[newBoardSlotIndex],
              isHidden: false,
              item: items[randomItem],
            };

            yield put(gameSaveBoardSlots(newBoardSlots));
          }

          yield delay(200);
        }
      }),
      cancel: take(GAME_STOP),
    })
  }
}

function* hideAllItems() {
  yield takeEvery(GAME_STOP, function* () {
    const boardSlots: BoardSlotInterface[] = yield select(getBoardSlots);

    for (let { isHidden, item, id } of boardSlots) {
      if (!isHidden && item) {
        yield put(gameHideItem(id));
      }
    }
  });
}

function* resetScores() {
  yield takeEvery(GAME_START, function* () {
    const collectedItems: CollectedItemInterface[] = yield select(getCollectedItems);
    const newCollectedItems = collectedItems.map((collectedItem) => ({
      ...collectedItem,
      quantity: 0,
    }));

    yield put(gameSaveItems(newCollectedItems));
  });
}

export default [
  setupItems(),
  setupBoard(),
  showItem(),
  hideItem(),
  scoreItem(),
  removeItem(),
  spawnItems(),
  hideAllItems(),
  resetScores(),
];
