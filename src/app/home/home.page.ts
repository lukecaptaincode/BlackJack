import { Component } from '@angular/core';
import { Blackjack } from '../core/blackJack';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public blackJack: Blackjack;
  constructor() {
    this.start();
  }

  start() {
    this.blackJack = new Blackjack();
  }

  hit() {
    this.blackJack.hit(this.blackJack.player);
  }

  stand() {
    this.blackJack.stand();
  }
}
