import { Component } from '@angular/core';
import { Blackjack } from '../classes/BlackJack';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  blackJack: Blackjack;
  constructor() {}

  start(){
    this.blackJack = new Blackjack();
  }

  hit(){
    this.blackJack.hit(this.blackJack.player);
    this.blackJack.handCheck(this.blackJack.player);
  }

  stand(){
    this.blackJack.stand();
    this.blackJack.handCheck(this.blackJack.dealer);
  }

}
