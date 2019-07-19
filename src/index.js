import TRex from './TRex.js'
import Floor from './Floor.js'
import Cactus from './Cactus.js'
import Cloud from './Cloud.js'
import {getRandomValue} from './Utils.js'

const VX = 3 // Game velocity
const SPRITE_SHEET = new Image()
SPRITE_SHEET.src = "./res/sprite.png"
let gameIsRunning = false

// The canvas is getted, and so the canvas is
let canvas = document.getElementById('canvas')
canvas.width = 600
canvas.height = 200
let ctx = canvas.getContext('2d')
drawText("Press [Enter] to play.", canvas.width / 2, canvas.height / 2)

// Declare objects
sessionStorage.setItem('record', 0)
let trex
let floor = []
let cactus = []
let cactusNumber = getRandomValue(1, 2)
let clouds = []
let cloudsNumber = 3
const intervals = []

// The listener is hearing...
document.addEventListener('keydown', e => {
  if(!gameIsRunning) {
    if(e.keyCode == 13) {
      setup()
    }
  } else {
    trex.move(e)
  }
})

// Text function, it's more elegant ;)
function drawText(text, x, y, color, size) {
  ctx.font = `${size || 50}px Arial`
  ctx.fillStyle = color || "#535353"
  ctx.textAlign = "center"
  ctx.fillText(text, x, y)
}

// Initialize the default values of the objects
function setup() {
  gameIsRunning = true
  intervals.push(setInterval(loop, 10))
  
  trex = new TRex(
    canvas.height - 14 - 47, // 14 is the floor height, 47 is the trex height
    VX,
    SPRITE_SHEET
  )

  for(let i = 0; i < cloudsNumber; i++) {
    clouds.push(new Cloud(
      getRandomValue(canvas.width, canvas.width + 400),
      getRandomValue(0, canvas.height - 14),
      1,
      SPRITE_SHEET
    ))
  }

  for(let i = 0; i < 2; i++) {
    floor.push(new Floor(
      1204 * (i - 1),
      canvas.height - 14, // 14 is the floor height
      VX,
      SPRITE_SHEET
    ))
  }

  for(let i = 0; i < cactusNumber; i++) {
    cactus.push(new Cactus(
      getRandomValue(canvas.width, canvas.width + 200),
      canvas.height - 12 - 34,
      VX,
      getRandomValue(1, 5),
      SPRITE_SHEET
    ))
  }
}

// The main loop is defined and time is measured
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  clouds.forEach((cloud, index) => {
    cloud.update(ctx)

    if(cloud.getX() + cloud.getWidth() <= canvas.width - 150 && clouds.length < 8) {
      clouds.push(
        new Cloud(
          getRandomValue(canvas.width, canvas.width + 400),
          getRandomValue(0, canvas.height - 14),
          1,
          SPRITE_SHEET
        )
      )
    } else if (cloud.getX() + cloud.getWidth() <= 0) {
      clouds.splice(index, 1)
    }
  })

  drawText(Math.floor(trex.distance / 10), canvas.width - 100, 50)
  drawText(`Record: ${sessionStorage.getItem('record')}m`, canvas.width - 100, 80, null, 15)
  
  trex.update(ctx)
  floor[0].update(ctx)
  floor[1].update(ctx)

  if(floor[0].getX() <= -1204) { // Does the first floor overpasses the end?
    floor.splice(0, 1)
    floor.push(
      new Floor(
        1204,
        canvas.height - 14,
        VX,
        SPRITE_SHEET
      )
    )
    floor[1].getImage().onload = floor[1].update(ctx)
  }
  
  cactus.forEach((cac, index) => {
    cac.update(ctx)

    if(cac.getX() <= 0) {
      cactus.splice(index, 1)

      for(let i = 0; i < cactusNumber; i++) {
        cactus.push(new Cactus(
          getRandomValue(canvas.width, canvas.width + 100),
          canvas.height - 14 - 34,
          VX,
          getRandomValue(0, 5),
          SPRITE_SHEET
        ))
      }

      cactusNumber = getRandomValue(1, 2)
    }
    
    if(trex.didCollide(cac.getX() + 9, cac.getY() + 2)) {
      trex.die(ctx)

      if(trex.distance > sessionStorage.getItem('record')) {
        sessionStorage.setItem('record', Math.floor(trex.distance / 10))
      }

      gameOver() // Finish the game
    }
  })
}

// Define the function who is going to stop the game
function gameOver() {
  gameIsRunning = false
  clearInterval(intervals[0])
  intervals.splice(0, 1)

  trex = undefined
  floor = []
  cactus = []
  clouds = []
  
  drawText("Game over!", 200, 100, null, 70)
  return
}
