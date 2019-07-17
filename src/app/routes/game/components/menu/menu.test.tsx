import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from '@testing-library/react';

import Menu from './menu';

afterEach(cleanup);

test('Snapshot Correct Component', () => {
  const tree = renderer
    .create(
      <Menu
        collectedItems={[]}
        startGameHandler={jest.fn()}
        stopGameHandler={jest.fn()}
        isGameRunning={false}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test('Table not displayed when empty, scores displayed always', () => {
  const { container } = render(
    <Menu
      collectedItems={[]}
      startGameHandler={jest.fn()}
      stopGameHandler={jest.fn()}
      isGameRunning={false}
    />
  );

  expect(container.getElementsByClassName('scores-table')).toHaveLength(0);
  expect(container.getElementsByClassName('scores-list')).toHaveLength(1);
})

test('Interactions', () => {
  const mockStartGameHandler = jest.fn();
  const mockStopGameHandler = jest.fn();

  let { container } = render(
    <Menu
      collectedItems={[]}
      startGameHandler={mockStartGameHandler}
      stopGameHandler={mockStopGameHandler}
      isGameRunning={false}
    />
  );

  expect(container.getElementsByClassName('menu__footer-button--green')).toHaveLength(1);
  expect(container.getElementsByClassName('menu__footer-button--red')).toHaveLength(0);
  fireEvent.click(container.getElementsByClassName('menu__footer-button')[0]);
  expect(mockStartGameHandler).toBeCalled();
  expect(mockStopGameHandler).not.toBeCalled();

  mockStartGameHandler.mockReset();
  mockStopGameHandler.mockReset();

  container = render(
    <Menu
      collectedItems={[]}
      startGameHandler={mockStartGameHandler}
      stopGameHandler={mockStopGameHandler}
      isGameRunning={true}
    />
  ).container;

  expect(container.getElementsByClassName('menu__footer-button--green')).toHaveLength(0);
  expect(container.getElementsByClassName('menu__footer-button--red')).toHaveLength(1);
  fireEvent.click(container.getElementsByClassName('menu__footer-button')[0]);
  expect(mockStartGameHandler).not.toBeCalled();
  expect(mockStopGameHandler).toBeCalled();
})
