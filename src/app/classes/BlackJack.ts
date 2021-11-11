import { Deck } from "./Deck";

export class Blackjack {
  deck: Deck;
  player: Player = {hand: [], score: 0, isDealer: false};
  dealer: Player = {hand: [], score: 0, isDealer: true};
  constructor() {
    this.deck = new Deck();
    this.hit(this.dealer);
    this.hit(this.dealer);
    this.hit(this.player);
    this.hit(this.player);
  }

  hit(player:Player) {
    player.hand.push(this.draw());
    player.score = this.getHandValue(player);
    if(player.score >= 21) this.endGame(); 
  }

  draw(): Card | any{
    if (this.deck.cards.length <= 0) this.endGame();
    return this.deck.cards.pop();
  }

  endGame(player? : Player): void{
    let msg = 'Game Over';
    player?.isDealer ? msg += 'dealer wins' : msg += 'player wins';
    console.log(msg);
  }

  getHandValue(player: Player): number {
    let handValue = 0;
    player.hand.forEach(card => {
      if (card.rank == 'A' && player.score < 11){
				handValue += 11;
		} else if (card.rank == 'A'){
      handValue += 1;
		} else if (card.rank == 'J' || card.rank == 'Q' || card.rank == 'K'){
      handValue += 10;
		} else {
      handValue += parseInt(card.rank);
		}
    });
    return handValue;
  }
}
