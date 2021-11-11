export class Deck {
  cards: Array<Card> = [];
  suits = ["♠", "♥", "♦", "♣"];
  ranks = ["K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2", "A"];

  constructor() {
    this.suits.forEach((suit) => {
      this.ranks.forEach((rank) => {
        this.cards.push({
          suit: suit,
          rank: rank,
        });
      });
    });
    this.cards.sort(() => Math.random() - 0.5);
  }
  shuffle(): void {
    this.cards.sort(() => Math.random() - 0.5);
  }
}
