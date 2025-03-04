const X_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/x.png';
const O_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/circle.png';

function assignSpace(space, owner) {
  const image = document.createElement('img');
  image.src = owner === 'x' ? X_IMAGE_URL : O_IMAGE_URL;
  space.appendChild(image);

  const index = parseInt(space.dataset.index);
  takenBoxes[index] = owner;
  const indexToRemove = freeBoxes.indexOf(space);
  freeBoxes.splice(indexToRemove, 1);
  space.removeEventListener('click', changeToX);
}

function changeToX(event) {
  assignSpace(event.currentTarget, 'x');

  if (isGameOver()) {
    displayWinner();
  } else {
    computerChooseO();
  }
}

function computerChooseO() {
  const allBoxes  = document.querySelectorAll('#grid div');
  const index = Math.floor(Math.random() * freeBoxes.length);
  const freeSpace = freeBoxes[index];

  assignSpace(freeSpace, 'o');

  if (isGameOver()) {
    displayWinner();
  }
}

function isGameOver() {
  return freeBoxes.length === 0 || getWinner() !== null;
}

function displayWinner() {
  const winner = getWinner();
  const resultContainer = document.querySelector('#results');
  resultContainer.innerHTML = ''; // เคลียร์ผลลัพธ์เก่า

  const header = document.createElement('h1');
  const gif = document.createElement('img');

  if (winner === 'x') {
    header.textContent = 'ยินดีด้วยคุณชนะ ';
    gif.src = 'https://giphy.com/gifs/looneytunes-cartoon-looney-tunes-dYLWFqSfCKWB5C8MEw';
  } else if (winner === 'o') {
    header.textContent = 'เสียใจด้วยคุณแพ้! ';
    gif.src = 'https://giphy.com/gifs/looneytunes-cartoon-looney-tunes-bugs-bunny-dANEABUvbvpduyglys';
  } else {
    header.textContent = 'เราเสมอกันนนน! ';
    gif.src = 'https://giphy.com/gifs/looneytunes-cartoon-looney-tunes-bugs-bunny-dANEABUvbvpduyglys';
  }

  gif.style.width = '200px';
  gif.style.marginTop = '10px';

  resultContainer.appendChild(header);
  resultContainer.appendChild(gif);

  // ปิดการคลิกของช่องที่เหลือ
  for (const box of freeBoxes) {
    box.removeEventListener('click', changeToX);
  }
}

function checkBoxes(one, two, three) {
  if (takenBoxes[one] !== undefined &&
      takenBoxes[one] === takenBoxes[two] &&
      takenBoxes[two] === takenBoxes[three]) {
    return takenBoxes[one];
  }
  return null;
}

// Returns 'x', 'o', or null for no winner yet.
function getWinner() {
  for (let col = 0; col < 3; col++) {
    const offset = col * 3;
    // Check rows and columns.
    let result = checkBoxes(offset, 1 + offset, 2 + offset) ||
        checkBoxes(col, 3 + col, 6 + col);
    if (result) {
      return result;
    }
  }
  
  // Check diagonals
  return checkBoxes(0, 4, 8) || checkBoxes(2, 4, 6);
}

const freeBoxes = [];
// Map of box number -> 'x' or 'o'
const takenBoxes = {};
const boxes = document.querySelectorAll('#grid div');
for (const box of boxes) {
  box.addEventListener('click', changeToX);
  freeBoxes.push(box);
}

document.getElementById('restart').addEventListener('click', restartGame);

function restartGame() {
  // ล้างกระดาน
  const allBoxes = document.querySelectorAll('#grid div');
  allBoxes.forEach(box => {
    box.innerHTML = '';
    box.addEventListener('click', changeToX);
  });

  // รีเซ็ตตัวแปร
  freeBoxes.length = 0;
  allBoxes.forEach(box => freeBoxes.push(box));
  for (const key in takenBoxes) {
    delete takenBoxes[key];
  }

  // ล้างผลลัพธ์
 document.querySelector('#results').innerHTML = '';
}