import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup } from '@testing-library/react';

import { Game } from './game';

afterEach(cleanup);

test('Snapshot Correct Component', () => {
  const tree = renderer
    .create(
      <Game
        isGameRunning={false}
        collectedItems={[]}
        boardSlots={[]}
        gameInitAction={jest.fn()}
        gameStartAction={jest.fn()}
        gameStopAction={jest.fn()}
        gameScoreItemAction={jest.fn()}
        gameShowItemAction={jest.fn()}
        gameHideItemAction={jest.fn()}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
