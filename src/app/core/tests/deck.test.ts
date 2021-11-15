import { expect } from 'chai';
import { Deck } from '../deck';
let deck: Deck;
describe('Deck', () => {
  describe('constructor()', () => {
    before(() => {
      deck = new Deck();
    });
    it('should create deck with cards', () => {
      expect(deck).to.have.own.property('cards');
    });
    it('should contain 52 cards', () => {
      expect(deck.cards.length).to.equal(52);
    });
    it('should not contain duplicates', () => {
      const cardSet = new Set(deck.cards); //Sets can't have duplicates so use to determine length
      expect(cardSet.size).to.equal(52);
    });
  });
});
