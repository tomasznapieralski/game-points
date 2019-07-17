import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';

import { BoardSlotInterface } from '../../../../store/interfaces/board';

import Board from './board';

afterEach(cleanup);

test('Board displays the items with correct classes', () => {
  const boardSlots: BoardSlotInterface[] = [
    {
      id: 11,
      row: 1,
      col: 1,
      isHidden: true,
      item: null,
    },
    {
      id: 22,
      row: 2,
      col: 2,
      isHidden: false,
      item: {
        icon: 'fish',
        basePoints: 150,
        bonusPoints: 100,
        bonusMultiplier: 3,
      },
    },
    {
      id: 33,
      row: 3,
      col: 3,
      isHidden: true,
      item: {
        icon: 'fish',
        basePoints: 150,
        bonusPoints: 100,
        bonusMultiplier: 3,
      },
    },
  ];

  const tree = renderer
    .create(
      <Board
        boardSlots={boardSlots}
        handleBoardItemClick={jest.fn()}
        handleBoardItemInit={jest.fn()}
        handleBoardItemTimeout={jest.fn()}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();

  const { container } = render(
    <Board
      boardSlots={boardSlots}
      handleBoardItemClick={jest.fn()}
      handleBoardItemInit={jest.fn()}
      handleBoardItemTimeout={jest.fn()}
    />
  );

  expect(container.getElementsByClassName('board__playground-item')).toHaveLength(3);
  expect(container.getElementsByClassName('board__playground-item--hidden')).toHaveLength(2);
  expect(container.getElementsByClassName('board__playground-item--row-1')[0].className)
    .toBe('board__playground-item board__playground-item--row-1 board__playground-item--col-1 board__playground-item--hidden');
  expect(container.getElementsByClassName('board__playground-item--row-2')[0].className)
    .toBe('board__playground-item board__playground-item--row-2 board__playground-item--col-2');
  expect(container.getElementsByClassName('board__playground-item--row-3')[0].className)
    .toBe('board__playground-item board__playground-item--row-3 board__playground-item--col-3 board__playground-item--hidden');
});
