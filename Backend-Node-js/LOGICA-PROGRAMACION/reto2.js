/* EJEMPLO:
const zombies = '242';
const humans = '334';
const result = battleHorde(zombies, humans); // -> 2h

Primera ronda: Zombie 2 vs Human 3 -> Humano gana (+1)
Segunda ronda: Zombie 4 vs Human 3+1 -> Empate
Tercera ronda: Zombie 2 vs Human 4 -> Humano gana (+2)
Resultado: "2h"
*/

function battleHorde(zombies, humans) {
  let score = 0;
  for (let i = 0; i < zombies.length; i++) {
    score += Number(humans[i]) - Number(zombies[i]);
  }

  if (score === 0) return "x";
  return score < 0 ? Math.abs(score).toString() + "z" : score.toString() + "h";
}

const zombies = "244";
const humans = "334";
const result = battleHorde(zombies, humans);
console.log(result);
