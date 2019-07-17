import React from 'react';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';

import { ITEM_LIFE_TIME } from '../../../../constraints/items';

import Item from './item';

afterEach(cleanup);

test('Snapshot Correct Item Component', () => {
  const tree = renderer
    .create(
      <Item
        icon={'fish'}
        clickHandler={jest.fn()}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test('Snapshot Incorrect Item Component', () => {
  const tree = renderer
    .create(
      <Item icon={''} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test('Test correct class name', () => {
  const div = document.createElement('div');

  ReactDOM.render(<Item icon={'fish'} />, div);
  expect(div.getElementsByClassName('item__icon--fish')).toHaveLength(1);
  expect(div.getElementsByClassName('item__icon--biohazard')).toHaveLength(0);

  ReactDOM.render(<Item icon={'biohazard'} />, div);
  expect(div.getElementsByClassName('item__icon--fish')).toHaveLength(0);
  expect(div.getElementsByClassName('item__icon--biohazard')).toHaveLength(1);

  ReactDOM.render(<Item icon={''} />, div);
  expect(div.getElementsByClassName('item__icon--fish')).toHaveLength(1);
  expect(div.getElementsByClassName('item__icon--biohazard')).toHaveLength(0);

  ReactDOM.unmountComponentAtNode(div);
});

test('Test hooks and interactions', () => {
  const mockInitHandler = jest.fn();
  const mockTimeoutHandler = jest.fn();
  const mockClickHandler = jest.fn();
  const mockId = 4;

  jest.useFakeTimers();

  const { container } = render(
    <Item
      icon={'fire'}
      initHandler={mockInitHandler}
      timeoutHandler={mockTimeoutHandler}
      clickHandler={mockClickHandler}
      id={mockId}
    />
  );

  expect(mockInitHandler).toBeCalledWith(mockId);
  expect(mockInitHandler).toBeCalledTimes(1);
  expect(mockTimeoutHandler).not.toBeCalled();

  expect(mockClickHandler).not.toBeCalled();
  fireEvent.click(container.getElementsByClassName('item')[0]);
  expect(mockClickHandler).toBeCalled();

  jest.advanceTimersByTime(ITEM_LIFE_TIME);
  expect(mockTimeoutHandler).toBeCalledWith(mockId);
  expect(mockTimeoutHandler).toBeCalledTimes(1);

  mockInitHandler.mockReset();
  mockTimeoutHandler.mockReset();

  render(
    <Item
      icon={'fire'}
      initHandler={mockInitHandler}
      timeoutHandler={mockTimeoutHandler}
    />
  );

  expect(mockInitHandler).not.toBeCalled();
  expect(mockTimeoutHandler).not.toBeCalled();
})
