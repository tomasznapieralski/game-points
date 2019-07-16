import React from 'react';

import { CollectedItemInterface } from '../../../../store/interfaces/item';

import Item from '../item/item';

import './scores-table.scss';

interface PropsInterface {
  collectedItems: CollectedItemInterface[];
}

const ScoresTable: React.FC<PropsInterface> = ({ collectedItems }) => {
  return (
    <table className="scores-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Point</th>
          <th></th>
          <th>Quant.</th>
          <th></th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {collectedItems && collectedItems.map(({
          item: {
            basePoints,
            bonusPoints,
            bonusMultiplier,
            icon,
          },
          quantity,
        }) =>
          <React.Fragment key={icon}>
            <tr>
              <td rowSpan={bonusMultiplier > 0? 2 : 1}><Item icon={icon} /></td>
              <td>{basePoints}</td>
              <td>x</td>
              <td>{quantity}</td>
              <td>=</td>
              <td>{basePoints * quantity}</td>
            </tr>
            {bonusMultiplier > 0 &&
              <tr>
                <td
                  className="scores-table__bonus-info"
                  colSpan={5}
                >
                  Bonus {bonusPoints} points for every {bonusMultiplier} items
                </td>
              </tr>
            }
          </React.Fragment>
        )}
      </tbody>
    </table>
  );
}

export default ScoresTable;
