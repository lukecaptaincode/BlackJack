import { Deck } from './Deck';
import { Card, Player } from './types';
export class Blackjack {
  deck: Deck;
  player: Player = { hand: [], score: 0, isDealer: false };
  dealer: Player = { hand: [], score: 0, isDealer: true };
  gameInfo = { isOver: false, winner: '' };
  constructor() {
    this.deck = new Deck();
    for (let i = 0; i < 2; i++) {
      this.hit(this.dealer);
      this.hit(this.player);
    }
  }
  handCheck(player: Player) {
    const opposingPlayer: Player = player.isDealer ? this.player : this.dealer;
    if (player.score === 21 ||(player.score < 21 && opposingPlayer.score < player.score)) {
      this.gameInfo = { isOver: true,winner: player.isDealer ? 'dealer' : 'player'};
    } else if (player.score > 21) {
      this.gameInfo = { isOver: true, winner: player.isDealer ? 'player' : 'dealer'};
    } else if (player.score === 20 && opposingPlayer.score === 20) {
      this.gameInfo = { isOver: true, winner: 'dealer' };
    }
  }
  hit(player: Player) {
    player.hand.push(this.deck.cards.pop());
    player.score = this.getHandValue(player);
  }
  stand() {
    while (this.dealer.score < 17) {
      this.hit(this.dealer);
      this.handCheck(this.dealer);
    }
  }
  getHandValue(player: Player): number {
    return player.hand.map((card) => {
        if (card.rank === 'A' && player.score < 11) {
          return 11;
        } else if (card.rank === 'A') {
          return 1;
        } else if (card.rank === 'J' ||card.rank === 'Q' ||card.rank === 'K') {
          return 10;
        } else {
          return parseInt(card.rank, 10);
        }
      }).reduce((a, b) => a + b, 0);
  }
}
