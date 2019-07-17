import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';

import { CollectedItemInterface } from '../../../../store/interfaces/item';

import ScoresList from './scores-list';

afterEach(cleanup);

test('Snapshot Correct Component', () => {
  const tree = renderer
    .create(
      <ScoresList
        collectedItems={[]}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test('Scores are counted correctly', () => {
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
      <ScoresList
        collectedItems={collectedItems}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();

  const { container } = render(
    <ScoresList
      collectedItems={collectedItems}
    />
  );

  const items = container.getElementsByClassName('scores-list__item');
  expect(items[0].children[1].textContent).toBe('2500');
  expect(items[1].children[1].textContent).toBe('300');
  expect(items[2].children[1].textContent).toBe('2800');
});
