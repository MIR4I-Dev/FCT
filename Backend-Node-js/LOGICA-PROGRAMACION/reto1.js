function findBestPotion(potions, goal){
  seen = new Map();
  for(let i=0;i<potions.length;i++){
    const currentPotion = potions[i];
    const complement = goal - currentPotion;    
    if(seen.has(complement)) return [seen.get(complement), i]
    seen.set(currentPotion, i);
    
    console.log(seen);
  }
}

const idealPotion = findBestPotion([3,3,0], 3);
console.log(idealPotion);