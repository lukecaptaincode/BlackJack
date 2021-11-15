import { Blackjack } from './blackJack';
import * as readline from 'readline';
import { exit } from 'process';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const update = (game: Blackjack): void => {
  console.log(
    `Dealer - Hand: ${JSON.stringify(game.dealer.hand)} , Score: ${
      game.dealer.score
    }`
  );
  console.log(
    `Player - Hand: ${JSON.stringify(game.player.hand)} , Score: ${
      game.player.score
    }`
  );
};
const endGame = (): void => {
  console.log(`GameOver: ${blackJack.gameInfo.winner} wins!`);
  rl.question('Play Again? [y/n]', (answer) => {
    switch (answer.toLocaleLowerCase()) {
      case 'y':
        blackJack = new Blackjack();
        update(blackJack);
        hitOrStand();
        break;
      case 'n':
        exit(0);
        break;
    }
  });
};
const hitOrStand = (): void => {
  if (!blackJack.gameInfo.isOver) {
    rl.question('Hit Or Stand? [h/s]', (answer) => {
      switch (answer.toLocaleLowerCase()) {
        case 'h':
          blackJack.hit(blackJack.player);
          update(blackJack);
          hitOrStand();
          break;
        case 's':
          blackJack.stand();
          update(blackJack);
          endGame();
          break;
        default:
      }
    });
  } else {
    endGame();
  }
};
let blackJack = new Blackjack();
update(blackJack);
hitOrStand();
