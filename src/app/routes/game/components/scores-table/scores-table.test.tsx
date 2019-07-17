import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';

import { CollectedItemInterface } from '../../../../store/interfaces/item';

import ScoresTable from './scores-table';

afterEach(cleanup);

test('Table displays the data', () => {
  const collectedItems: CollectedItemInterface[] = [
    {
      item: {
        icon: 'fish',
        basePoints: 150,
        bonusPoints: 100,
        bonusMultiplier: 3,
      },
      quantity: 10,
    },
    {
      item: {
        icon: 'lemon',
        basePoints: 100,
        bonusPoints: 0,
        bonusMultiplier: 0,
      },
      quantity: 10,
    },
  ];

  const tree = renderer
    .create(
      <ScoresTable
        collectedItems={collectedItems}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();

  const { container } = render(
    <ScoresTable
      collectedItems={collectedItems}
    />
  );

  expect(container.getElementsByTagName('tr')).toHaveLength(4);
  expect(container.getElementsByTagName('svg')).toHaveLength(2);
  expect(container.getElementsByClassName('scores-table__bonus-info')).toHaveLength(1);
});
