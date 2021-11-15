export interface Card {
  suit: string;
  rank: string;
}
export interface Player {
  hand: Array<Card | any>;
  score: number;
  isDealer: boolean;
  isStanding: boolean;
}
