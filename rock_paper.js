const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
let grid = {};

const w = window.innerWidth
const h = window.innerHeight

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const objSize = Math.max(canvas.height, canvas.width) * 0.03
console.log(objSize)
const gridSize = objSize * 3

let speedRatio = 1
const rock = 'rock'
const paper = 'paper'
const scissors = 'scissors'

const randUnit = () => Math.random() > 0.5 ? Math.random() * 20 : Math.random() * -20

const lowerLeftStartPos = (width, height) => {
  return [(0.1 * width) + randUnit(), (0.9 * height + randUnit()) - objSize * 2]
}

const upperMiddle = (width, height) => {
  return [width * 0.5 + randUnit(), height * 0.1 + randUnit() + objSize * 2]
}

const lowerRightSidePos = (width, height) => {
  return [(0.9 * width) - randUnit(), (0.9 * height + randUnit()) - objSize * 2]
}

const speed = (range) => {
  const r = range * Math.random() * (0.0012 - 0.0008) + 0.0005;
  if (Math.random() > 0.5) {
    return -r
  }
  return r
}


const objGen = (type, pos, w, h) => {
  let x = 0;
  let y = 0;
  let vx = speed(w);
  let vy = speed(h);
  switch (pos) {
    case 'll':
      [x, y] = lowerLeftStartPos(w, h)
      break;
    case 'lr':
      [x, y] = lowerRightSidePos(w, h)
      break;
    case 'um':
      [x, y] = upperMiddle(w, h)
      break;
    case 'rand':
      x = Math.random() * w * 0.9 + objSize
      y = Math.random() * h * 0.9 + objSize
  }

  return {
    x: x,
    y: y,
    vx: vx,
    vy: vy,
    size: objSize,
    type: type
  };
}

const objs = [];
for (let i = 0; i < 20; i++) {
  objs.push(objGen(rock, 'll', canvas.width, canvas.height))
  objs.push(objGen(paper, 'lr', canvas.width, canvas.height))
  objs.push(objGen(scissors, 'um', canvas.width, canvas.height))
}

function drawObject(ctx, obj) {
  let emoji = "❓";
  if (obj.type === rock) emoji = "🪨";      // rock emoji (not all browsers support)
  if (obj.type === paper) emoji = "📄";
  if (obj.type === scissors) emoji = "✂️";

  ctx.font = `${obj.size}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji, obj.x, obj.y);
}

function update() {
  for (let i = 0; i < objs.length; i++) {
    objs[i].x += objs[i].vx;
    objs[i].y += objs[i].vy;
    if (objs[i].x < objSize || objs[i].x > canvas.width - objSize) objs[i].vx *= -1;
    if (objs[i].y < objSize || objs[i].y > canvas.height - objSize) objs[i].vy *= -1;

    const gx = Math.floor(objs[i].x / gridSize)
    const gy = Math.floor(objs[i].y / gridSize)

    const key = `${gx}${gy}`
    if (!grid[key]) grid[key] = [];
    grid[key].push(objs[i]);
  }

  checkCollision()
  grid = {}
}

function checkCollision() {
  for (let i = 0; i < objs.length; i++) {
    const obj = objs[i]
    const x = Math.floor(obj.x / gridSize)
    const y = Math.floor(obj.y / gridSize)

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (x + dx >= 0 && y + dy >= 0) {
          const neighbors = grid[`${x + dx}${y + dy}`]
          if (neighbors) {
            for (const another of neighbors) {
              if (obj === another) continue;
              const dist = (obj.x - another.x) ** 2 + (obj.y - another.y) ** 2
              if (dist < objSize ** 2 && obj.type != another.type) {
                if (obj.type == rock && another.type == paper) {
                  objs[i].type = paper
                }
                if (obj.type == scissors && another.type == rock) {
                  objs[i].type = rock
                }
                if (obj.type == paper && another.type == scissors) {
                  objs[i].type = scissors
                }
              }
            }
          }
        }
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (i = 0; i < objs.length; i++) {
    drawObject(ctx, objs[i])
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

document.getElementById('add-rock').addEventListener('click', () => {
  objs.push(objGen(rock, 'rand', w, h))
});

document.getElementById('add-paper').addEventListener('click', () => {
  objs.push(objGen(paper, 'rand', w, h))
});

document.getElementById('add-scissors').addEventListener('click', () => {
  objs.push(objGen(scissors, 'rand', w, h))
});

document.getElementById('speed-up').addEventListener('click', () => {
  objs.forEach((_, i) => { objs[i].vx *= 1.1; objs[i].vy *= 1.1 })
});

document.getElementById('slow-down').addEventListener('click', () => {
  objs.forEach((_, i) => { objs[i].vx *= 0.9; objs[i].vy *= 0.9 })
});

loop();
