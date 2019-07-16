import React from 'react';

import { CollectedItemInterface } from '../../../../store/interfaces/item';

import './scores-list.scss';

interface PropsInterface {
  collectedItems: CollectedItemInterface[];
}

const ScoresList: React.FC<PropsInterface> = ({ collectedItems }) => {
  const basePoints = collectedItems.reduce((acc, collectedItem) =>
    acc + collectedItem.quantity * collectedItem.item.basePoints
  , 0);
  const bonusPoints = collectedItems
    .filter((collectedItem) => collectedItem.item.bonusMultiplier > 0)
    .reduce((acc, {
      quantity,
      item: {
        bonusMultiplier,
        bonusPoints,
      }
    }) => acc + Math.floor(quantity / bonusMultiplier) * bonusPoints
    , 0);
  const totalPoints = basePoints + bonusPoints;

  return (
    <ul className="scores-list">
      <li className="scores-list__item">
        <div>
          Base points:
        </div>
        <div>
          {basePoints}
        </div>
      </li>
      <li className="scores-list__item">
        <div>
          Bonus points:
        </div>
        <div>
          {bonusPoints}
        </div>
      </li>
      <li className="scores-list__item">
        <div>
          Total points:
        </div>
        <div>
          {totalPoints}
        </div>
      </li>
    </ul>
  );
}

export default ScoresList;
