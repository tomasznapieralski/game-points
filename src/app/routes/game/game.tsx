import React, { useEffect } from 'react';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import Board from './components/board/board';
import Menu from './components/menu/menu';

import { AppStateInterface } from '../../store/reducers';

import { CollectedItemInterface } from '../../store/interfaces/item';
import { BoardSlotInterface } from '../../store/interfaces/board';

import {
  getCollectedItems,
  getBoardSlots,
  getIsGameRunning,
} from '../../store/selectors/game';

import {
  gameInit,
  gameScoreItem,
  gameShowItem,
  gameHideItem,
  gameStart,
  gameStop,
} from '../../store/actions/game';

import './game.scss';

interface PropsInterface {
  isGameRunning: boolean;
  collectedItems: CollectedItemInterface[];
  boardSlots: BoardSlotInterface[];
  gameInitAction: () => Action;
  gameStartAction: () => Action;
  gameStopAction: () => Action;
  gameScoreItemAction: (id: number) => Action;
  gameShowItemAction: (id: number) => Action;
  gameHideItemAction: (id: number) => Action;
}

export const Game: React.FC<PropsInterface> = ({
  isGameRunning,
  collectedItems,
  boardSlots,
  gameInitAction,
  gameStartAction,
  gameStopAction,
  gameScoreItemAction,
  gameShowItemAction,
  gameHideItemAction,
}) => {
  useEffect(() => {
    gameInitAction();
  }, [gameInitAction]);

  return (
    <div className="game">
      <div className="game__board">
        <Board
          boardSlots={boardSlots}
          handleBoardItemClick={gameScoreItemAction}
          handleBoardItemInit={gameShowItemAction}
          handleBoardItemTimeout={gameHideItemAction}
        />
      </div>
      <div className="game__menu">
        <Menu
          collectedItems={collectedItems}
          isGameRunning={isGameRunning}
          startGameHandler={gameStartAction}
          stopGameHandler={gameStopAction}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppStateInterface) => ({
  isGameRunning: getIsGameRunning(state),
  collectedItems: getCollectedItems(state),
  boardSlots: getBoardSlots(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  gameInitAction: () => dispatch(gameInit()),
  gameStartAction: () => dispatch(gameStart()),
  gameStopAction: () => dispatch(gameStop()),
  gameScoreItemAction: (id: number) => dispatch(gameScoreItem(id)),
  gameShowItemAction: (id: number) => dispatch(gameShowItem(id)),
  gameHideItemAction: (id: number) => dispatch(gameHideItem(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
