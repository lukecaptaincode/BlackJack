import { Deck } from './deck';
import { Player } from './types';
export class Blackjack {
  deck: Deck;
  player: Player = { hand: [], score: 0, isDealer: false, isStanding: false};
  dealer: Player = { hand: [], score: 0, isDealer: true, isStanding: false};
  gameInfo = { isOver: false, winner: '' };
  constructor() {
    this.deck = new Deck();
    this.hit(this.dealer);
    this.hit(this.player);
    this.hit(this.player);
  }
  handCheck(player: Player) {
    const opposingPlayer: Player = player.isDealer ? this.player : this.dealer;
    if(player.score > 21){
      this.gameInfo = { isOver: true, winner: opposingPlayer.isDealer ? 'dealer' : 'player'};
    }else if ((player.score === 21) ||(player.isStanding && (opposingPlayer.score < player.score) && player.score < 22)) {
      this.gameInfo = { isOver: true, winner: player.isDealer ? 'dealer' : 'player'};
    } else if (player.isStanding && (player.score === opposingPlayer.score)){
      this.gameInfo = { isOver: true, winner: 'dealer'};
    }
  }
  hit(player: Player) {
      player.hand.push(this.deck.cards.pop());
      player.score = this.getHandValue(player);
      this.handCheck(this.player);
  }
  stand() {
    while (this.dealer.score < 17) {
      this.hit(this.dealer);
    }
    this.player.isStanding = this.dealer.isStanding = true;
    this.handCheck(this.dealer);
  }
  getHandValue(player: Player): number {
    let score = player.hand.map((card) => {
        if (card.rank === 'A') {
          return 11;
        } else if (card.rank === 'J' ||card.rank === 'Q' ||card.rank === 'K') {
          return 10;
        } else {
          return parseInt(card.rank, 10);
        }
      }).reduce((a, b) => a + b, 0);
      if (score > 21 && player.hand.some(card => card.rank === 'A') ) {  //Make Aces low
          score -= (player.hand.find(c => c === 'A').length * 10);
      }
      return score;
  }
}
