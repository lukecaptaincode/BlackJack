declare interface Card {
    suit: string;
    rank: string;
  }
  
  declare interface Player{
    hand: Array<Card | any>;
    score: number;
    isDealer: boolean;
  }