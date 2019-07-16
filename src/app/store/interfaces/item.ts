export interface ItemInterface {
  icon: string;
  basePoints: number;
  bonusPoints: number;
  bonusMultiplier: number;
}

export interface CollectedItemInterface {
  item: ItemInterface;
  quantity: number;
}
