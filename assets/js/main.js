const container = document.querySelector(".container");
const moves = document.querySelector("main h2");
console.log(moves);

let numMoves = 0;
let solved = 0;
let cardProperties = {}
let allCards = [];
let openCards = {'keys': [], 'content': []};
let numCards = 36;
let numbers = [];

for(i = 0; i < numCards / 2; i++){
  numbers.push({'num': Math.floor(Math.random() * 200), 'used':0});
}

for(i = 0; i < numCards; i++){
  let key = Math.floor(Math.random() * numbers.length);
  let num = numbers[key];
  num.used ++;
  allCards.push(num.num);
  const card = document.createElement('div');
  const overlay = document.createElement('div');
  card.innerHTML = `<div class="content">000</div>`;
  card.setAttribute('data-key', i);
  card.classList.add('card');
  overlay.classList.add('cardOverlay');
  
  card.appendChild(overlay);
  container.appendChild(card);
  if(num.used === 2){
    numbers.splice(key, 1);
  }
}

container.style.gridTemplateColumns = `repeat(${6},auto)`;
container.style.gridTemplateRows = `repeat(${6},auto)`;

const cards = document.querySelectorAll('.card');
const content = document.querySelectorAll('.content');

cards.forEach(card => {
  card.addEventListener('click', () => {
    card.innerHTML = `<div class="content">${allCards[card.dataset.key]}</div>`;
    let cardColr = getComputedStyle(card, null).getPropertyValue('background-color');
    card.style.backgroundColor = "white";
    card.querySelector('.content').classList.add('contentVisible');
    if(card.dataset.key != openCards.keys[0] && card.dataset.key != openCards.keys[1]){
      moves.innerHTML = `Moves: ${++numMoves}`;
      openCards.keys.push(card.dataset.key);
      openCards.content.push(allCards[card.dataset.key]);

      const div1 = container.querySelector(`div[data-key='${openCards.keys[0]}']`);
      const div2 = container.querySelector(`div[data-key='${openCards.keys[1]}']`);

      if(allCards[openCards.keys[0]] === allCards[openCards.keys[1]] || solved === numCards){
        ++solved;
        div1.style.visibility = 'hidden';           
        div2.style.visibility = 'hidden';
        console.log(allCards[openCards.keys[0]], allCards[openCards.keys[1]])           
        console.log(solved);           
      }

    if(openCards.content.length >= 3 ){
      div1.innerHTML = `<div class="content">000</div>`;
      div2.innerHTML = `<div class="content">000</div>`;

      div1.style.backgroundColor = 'blue';
      div2.style.backgroundColor = 'blue';
      
      openCards.keys.splice(0, 2);
      openCards.content.splice(0, 2);
    }
  }
  });
});