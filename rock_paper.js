const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
let grid = {};

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const objSize = 20
const gridSize = 40

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

const speed = () => {
  const r = Math.random() * (0.4 - 0.2) + 0.3;
  if (Math.random() > 0.5) {
    return -r
  }
  return r
}


const objGen = (type, pos, w, h) => {
  let x = 0;
  let y = 0;
  let vx = speed();
  let vy = speed();
  switch (pos) {
    case 'll':
      [x, y] = lowerLeftStartPos(w, h)
      //vx = vx > 0 ? vx : -vx
      //vy = vy < 0 ? vx : -vx
      break;
    case 'lr':
      [x, y] = lowerRightSidePos(w, h)
      break;
    case 'um':
      [x, y] = upperMiddle(w, h)
      break;
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
  objs.push(objGen('rock', 'll', canvas.width, canvas.height))
  objs.push(objGen('paper', 'lr', canvas.width, canvas.height))
  objs.push(objGen('scissors', 'um', canvas.width, canvas.height))
}

console.log(objs)

function drawObject(ctx, obj) {
  let emoji = "❓";
  if (obj.type === "rock") emoji = "🪨";      // rock emoji (not all browsers support)
  if (obj.type === "paper") emoji = "📄";
  if (obj.type === "scissors") emoji = "✂️";

  ctx.font = `${obj.size * 2}px sans-serif`;
  ctx.fillText(emoji, obj.x, obj.y);
}

function update() {
  for (let i = 0; i < objs.length; i++) {
    objs[i].x += objs[i].vx;
    objs[i].y += objs[i].vy;
    if (objs[i].x < 0 || objs[i].x > canvas.width - objs[i].size - 2) objs[i].vx *= -1;
    if (objs[i].y < 0 || objs[i].y > canvas.height - objs[i].size - 2) objs[i].vy *= -1;

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
              if (dist < 280 && obj.type != another.type) {
                if (obj.type == rock && another.type == paper) {
                  objs[i].type = paper
                }
                if (obj.type == rock && another.type == scissors) {
                  another.type = rock
                }
                if (obj.type == scissors && another.type == paper) {
                  another.type = scissors
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

loop();
