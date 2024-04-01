const canvas = document.querySelector("#canvasBody");
const ctx = canvas.getContext("2d");

const dead = "#000000";
const alive = "#FFFFFF";

const size = Math.min(window.innerWidth, window.innerHeight);

function setupCanvas() {
  canvas.width = size;
  canvas.height = size;

}

function drawCanvas(lifeArray) {
  const boxSize = size / 10;
  // have to have 4 indexs so it might be able to clean up better than this, maybe having one divide by the otherlike xIndex being i / boxSize or something similar
  let yIndex = 0;
  for (let i = 0; i < canvas.width; i += boxSize) {
    let xIndex = 0;
    for (let j = 0; j < canvas.height; j += boxSize) {
      if(lifeArray[xIndex][yIndex] === 1) {
        ctx.fillStyle = 'black'
      } else {
        ctx.fillStyle = 'white' // had to take out continue to be able to increase xIndex increment
      }
      xIndex++
      ctx.fillRect(i, j, boxSize, boxSize);
    }
    yIndex++
  }
}

function setLifeArray() {
  let lifeArray = [];
  let lifeArrayRow = 10; // change these to change array size
  let lifeArrayColumn = 10; // ^^^
  for (let i = 0; i < lifeArrayRow; i++) {
    lifeArray[i] = [];
    for (let j = 0; j < lifeArrayColumn; j++) {
      if(Math.random() >= 0.5) {
        lifeArray[i][j] = 0; // dead
      } else {
        lifeArray[i][j] = 1; // alive
      }
    }
  }
  return lifeArray;
}

function playGameOfLife(lifeArray) {
  let nextCycleArray = [];
  console.log(lifeArray.length)
  for (let i = 0; i < lifeArray.length; i++) {
    nextCycleArray[i] = []; 
    for (let j = 0; j < lifeArray[0].length; j++) {
      let numberAlive = 0;

      numberAlive += isAlive(i, (j - 1), lifeArray); // left
      numberAlive += isAlive(i, (j + 1), lifeArray); // right
      numberAlive += isAlive((i - 1), j, lifeArray); // above
      numberAlive += isAlive((i - 1), (j - 1), lifeArray); // above left
      numberAlive += isAlive((i - 1), (j + 1), lifeArray); // above right
      numberAlive += isAlive((i + 1), j, lifeArray); // below
      numberAlive += isAlive((i + 1), (j - 1), lifeArray); // below left
      numberAlive += isAlive((i + 1), (j + 1), lifeArray); // below right
      
      if(numberAlive === 3) {
        nextCycleArray[i][j] = 1;
      } else if (lifeArray[i][j] === 1 && numberAlive === 2) {
        nextCycleArray[i][j] = 1;
      } else {
        nextCycleArray[i][j] = 0;
      }
      
    }
  }
  console.log(lifeArray)
  console.log(nextCycleArray)
  setTimeout(drawCanvas, 1000, nextCycleArray)
  setTimeout(playGameOfLife, 1000, nextCycleArray)
}

function isAlive (yIndex, xIndex, lifeArray) {
  let isSpaceAlive = 0;
  if(Array.isArray(lifeArray[yIndex])) {
    if(lifeArray[yIndex][xIndex] != NaN) {
      if(lifeArray[yIndex][xIndex] === 1) {
      isSpaceAlive = 1;
      } 
    }
  }
  
  return isSpaceAlive;
}


let lifeArray = setLifeArray();
setupCanvas();
drawCanvas(lifeArray);
playGameOfLife(lifeArray);
