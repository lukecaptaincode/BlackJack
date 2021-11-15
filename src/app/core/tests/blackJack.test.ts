import { Card } from '../types';
import { expect } from 'chai';
import { Blackjack } from '../blackJack';
let blackJack: Blackjack;
// Cards for testing
const tenHearts: Card = { suit: '♥', rank: '10' };
const twoHearts: Card = { suit: '♥', rank: '2' };
const aceHearts: Card = { suit: '♥', rank: 'A' };
const aceSpades: Card = { suit: '♠', rank: 'A' };
const nineHearts: Card = { suit: '♥', rank: '9' };
const fiveHearts: Card = { suit: '♥', rank: '5' };
const threeHearts: Card = { suit: '♥', rank: '3' };
describe('BlackJack', () => {
  before(() => {
    blackJack = new Blackjack();
  });
  describe('constructor()', () => {
    it('should draw two cards for player and one for dealer', () => {
      expect(blackJack.dealer.hand.length).to.equal(1);
      expect(blackJack.player.hand.length).to.equal(2);
    });
  });
  describe('hit()', () => {
    it('should draw card on hit', () => {
      blackJack.hit(blackJack.player);
      blackJack.hit(blackJack.dealer);
      expect(blackJack.player.hand.length).to.equal(3);
      expect(blackJack.dealer.hand.length).to.equal(2);
    });
  });
  describe('stand()', () => {
    it('should draw till 17 or greater', () => {
      blackJack.stand();
      expect(blackJack.dealer.score).to.be.greaterThanOrEqual(17);
    });
    it('should make dealer and player stand', () => {
      blackJack.stand();
      expect(blackJack.dealer.isStanding).to.equal(true);
      expect(blackJack.player.isStanding).to.equal(true);
    });
  });
  describe('getHandValue()', () => {
    before(() => {
      blackJack.player.score = 0;
    });
    it('should return correct value', () => {
      blackJack.player.hand = [twoHearts, threeHearts];
      expect(blackJack.getHandValue(blackJack.player)).to.equal(5);
    });
    it('should return correct value for Ace High', () => {
      blackJack.player.hand = [twoHearts, aceHearts];
      expect(blackJack.getHandValue(blackJack.player)).to.equal(13);
    });
    it('should return correct value for Ace Low', () => {
      blackJack.player.hand = [tenHearts, aceHearts, nineHearts];
      expect(blackJack.getHandValue(blackJack.player)).to.equal(20);
    });
    it('should return correct value for two Ace Low', () => {
      blackJack.player.hand = [aceHearts, aceHearts];
      expect(blackJack.getHandValue(blackJack.player)).to.equal(2);
    });
  });
  describe('handCheck()', () => {
    before(() => {
      blackJack.player.score = 0;
      blackJack.dealer.score = 0;
      blackJack.player.isStanding = true;
      blackJack.dealer.isStanding = true;
    });
    it('Player should win if score higher than dealer', () => {
      blackJack.player.hand = [nineHearts, aceHearts];
      blackJack.dealer.hand = [twoHearts, fiveHearts];
      blackJack.player.score = blackJack.getHandValue(blackJack.player);
      blackJack.dealer.score = blackJack.getHandValue(blackJack.dealer);
      blackJack.handCheck(blackJack.player);
      expect(blackJack.gameInfo.isOver).to.equal(true);
      expect(blackJack.gameInfo.winner).to.equal('player');
    });
    it('Dealer should win if score higher than player', () => {
      blackJack.dealer.hand = [nineHearts, aceHearts];
      blackJack.player.hand = [twoHearts, fiveHearts];
      blackJack.player.score = blackJack.getHandValue(blackJack.player);
      blackJack.dealer.score = blackJack.getHandValue(blackJack.dealer);
      blackJack.handCheck(blackJack.dealer);
      expect(blackJack.gameInfo.isOver).to.equal(true);
      expect(blackJack.gameInfo.winner).to.equal('dealer');
    });
    it('Player should win if 21', () => {
      blackJack.dealer.hand = [nineHearts, aceHearts];
      blackJack.player.hand = [tenHearts, aceHearts];
      blackJack.player.score = blackJack.getHandValue(blackJack.player);
      blackJack.dealer.score = blackJack.getHandValue(blackJack.dealer);
      blackJack.handCheck(blackJack.player);
      expect(blackJack.gameInfo.isOver).to.equal(true);
      expect(blackJack.gameInfo.winner).to.equal('player');
    });
    it('Player should win if 21 and dealer 21', () => {
      blackJack.dealer.hand = [nineHearts, aceHearts];
      blackJack.player.hand = [tenHearts, aceHearts];
      blackJack.player.score = blackJack.getHandValue(blackJack.player);
      blackJack.dealer.score = blackJack.getHandValue(blackJack.dealer);
      blackJack.handCheck(blackJack.player);
      expect(blackJack.gameInfo.isOver).to.equal(true);
      expect(blackJack.gameInfo.winner).to.equal('player');
    });
    it('Player should lose if score equal', () => {
      blackJack.dealer.hand = [nineHearts, nineHearts];
      blackJack.player.hand = [nineHearts, nineHearts];
      blackJack.player.score = blackJack.getHandValue(blackJack.player);
      blackJack.dealer.score = blackJack.getHandValue(blackJack.dealer);
      blackJack.handCheck(blackJack.player);
      expect(blackJack.gameInfo.isOver).to.equal(true);
      expect(blackJack.gameInfo.winner).to.equal('dealer');
    });
  });
});
