import React from 'react';
import { Action } from 'redux';

import { CollectedItemInterface } from '../../../../store/interfaces/item';

import ScoresTable from '../scores-table/scores-table';
import ScoresList from '../scores-list/scores-list';

import './menu.scss';

interface PropsInterface {
  collectedItems: CollectedItemInterface[];
  isGameRunning: boolean;
  startGameHandler: () => Action;
  stopGameHandler: () => Action;
}

const Menu: React.FC<PropsInterface> = ({
  collectedItems,
  isGameRunning,
  startGameHandler,
  stopGameHandler,
}) => {
  return (
    <div className="menu">
      <div className="menu__title">
        Player Items
      </div>
      {collectedItems.length > 0 &&
        <div className="menu__table">
          <ScoresTable collectedItems={collectedItems} />
        </div>
      }
      <div className="menu__space"></div>
      <div className="menu__footer">
        <ScoresList collectedItems={collectedItems} />
        {!isGameRunning &&
          <button
            className="menu__footer-button menu__footer-button--green"
            onClick={startGameHandler}
          >
            Start Game
          </button>
        }
        {isGameRunning &&
          <button
            className="menu__footer-button menu__footer-button--red"
            onClick={stopGameHandler}
          >
            Stop Game
          </button>
        }
      </div>
    </div>
  );
}

export default Menu;
