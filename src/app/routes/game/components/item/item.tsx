import React, { useEffect } from 'react';
import { Action } from 'redux';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBiohazard,
  faFire,
  faSpider,
  faLemon,
  faFish,
  faSkullCrossbones,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

import { ITEMS, ITEM_LIFE_TIME } from '../../../../constraints/items';

import './item.scss';

interface PropsInterface {
  icon: string;
  id?: number;
  clickHandler?: () => Action;
  initHandler?: (id: number) => Action;
  timeoutHandler?: (id: number) => Action;
}

const Item: React.FC<PropsInterface> = ({
  icon,
  id,
  clickHandler,
  initHandler,
  timeoutHandler,
}) => {
  let selectedIcon: IconDefinition;
  let iconClass: string;

  switch (icon) {
    case ITEMS.BIOHAZARD: {
      selectedIcon = faBiohazard;
      iconClass = 'item__icon--biohazard';
      break;
    }
    case ITEMS.FIRE: {
      selectedIcon = faFire;
      iconClass = 'item__icon--fire';
      break;
    }
    case ITEMS.SPIDER: {
      selectedIcon = faSpider;
      iconClass = 'item__icon--spider';
      break;
    }
    case ITEMS.LEMON: {
      selectedIcon = faLemon;
      iconClass = 'item__icon--lemon';
      break;
    }
    case ITEMS.SKULL: {
      selectedIcon = faSkullCrossbones;
      iconClass = 'item__icon--skull';
      break;
    }
    case ITEMS.FISH:
    default: {
      selectedIcon = faFish;
      iconClass = 'item__icon--fish';
      break;
    }
  }

  useEffect(() => {
    if (initHandler && id) {
      initHandler(id);
    }
  }, [initHandler, id]);

  useEffect(() => {
    setTimeout(() => {
      if (timeoutHandler && id) {
        timeoutHandler(id);
      }
    }, ITEM_LIFE_TIME);
  }, [timeoutHandler, id]);

  return (
    <div
      className={classNames('item', { 'item--clickable': clickHandler })}
      onClick={() => clickHandler && clickHandler()}
    >
      <FontAwesomeIcon
        className={classNames('item__icon', iconClass)}
        icon={selectedIcon}
      />
    </div>
  );
}

export default Item;
