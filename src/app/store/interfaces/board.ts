import { ItemInterface } from './item';

export interface BoardSlotInterface {
  id: number;
  row: number;
  col: number;
  isHidden: boolean;
  item: ItemInterface | null;
}
