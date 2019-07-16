import React from 'react';
import { Action } from 'redux';
import classNames from 'classnames';

import Item from '../item/item';

import logo from '../../../../../assets/logo.png';

import { BoardSlotInterface } from '../../../../store/interfaces/board';

import './board.scss';

interface PropsInterface {
  boardSlots: BoardSlotInterface[];
  handleBoardItemClick: (id: number) => Action;
  handleBoardItemInit: (id: number) => Action;
  handleBoardItemTimeout: (id: number) => Action;
}

const Board: React.FC<PropsInterface> = ({
  boardSlots,
  handleBoardItemClick,
  handleBoardItemInit,
  handleBoardItemTimeout,
}) => {
  return (
    <div className="board">
      <div className="board__title">
        <img
          className="board__logo"
          src={logo}
          alt=""
        />
        <div className="board__subtitle">
          Points
        </div>
      </div>
      <div className="board__playground">
        {boardSlots && boardSlots.map(({
          row,
          col,
          id,
          isHidden,
          item,
        }) =>
          <div
            className={classNames(
              'board__playground-item',
              `board__playground-item--row-${row}`,
              `board__playground-item--col-${col}`,
              {
                'board__playground-item--hidden': isHidden,
              }
            )}
            key={id}
          >
            {item && <Item
              icon={item.icon}
              id={id}
              initHandler={handleBoardItemInit}
              timeoutHandler={handleBoardItemTimeout}
              clickHandler={() => handleBoardItemClick(id)}
            />}
          </div>
        )}
      </div>
    </div>
  );
}

export default Board;
